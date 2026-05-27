import { Router, type IRouter } from "express";
import { promises as dns } from "node:dns";
import net from "node:net";

const router: IRouter = Router();

type CacheEntry = { imageUrl: string | null; expiresAt: number };
const cache = new Map<string, CacheEntry>();
const TTL_HIT_MS = 24 * 60 * 60 * 1000;
const TTL_MISS_MS = 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5000;
const MAX_HTML_BYTES = 512 * 1024;
const MAX_CACHE_ENTRIES = 500;
const MAX_REDIRECTS = 3;

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    n = (n << 8) + v;
  }
  return n >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
  const n = ipv4ToInt(ip);
  if (n === null) return true;
  const inRange = (start: string, prefix: number): boolean => {
    const s = ipv4ToInt(start)!;
    const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    return (n & mask) === (s & mask);
  };
  return (
    inRange("0.0.0.0", 8) ||
    inRange("10.0.0.0", 8) ||
    inRange("100.64.0.0", 10) ||
    inRange("127.0.0.0", 8) ||
    inRange("169.254.0.0", 16) ||
    inRange("172.16.0.0", 12) ||
    inRange("192.0.0.0", 24) ||
    inRange("192.0.2.0", 24) ||
    inRange("192.168.0.0", 16) ||
    inRange("198.18.0.0", 15) ||
    inRange("198.51.100.0", 24) ||
    inRange("203.0.113.0", 24) ||
    inRange("224.0.0.0", 4) ||
    inRange("240.0.0.0", 4) ||
    n === 0xffffffff
  );
}

function expandIPv6(ip: string): number[] | null {
  let addr = ip;
  const zone = addr.indexOf("%");
  if (zone !== -1) addr = addr.slice(0, zone);
  if (addr.includes(".")) {
    const lastColon = addr.lastIndexOf(":");
    const v4 = addr.slice(lastColon + 1);
    const n = ipv4ToInt(v4);
    if (n === null) return null;
    addr =
      addr.slice(0, lastColon + 1) +
      ((n >>> 16) & 0xffff).toString(16) +
      ":" +
      (n & 0xffff).toString(16);
  }
  const dbl = addr.split("::");
  if (dbl.length > 2) return null;
  const headParts = dbl[0] === "" ? [] : dbl[0].split(":");
  const tailParts = dbl.length === 2 ? (dbl[1] === "" ? [] : dbl[1].split(":")) : [];
  const missing = 8 - headParts.length - tailParts.length;
  if (dbl.length === 1 && headParts.length !== 8) return null;
  if (dbl.length === 2 && missing < 0) return null;
  const fillers = new Array(dbl.length === 2 ? missing : 0).fill("0");
  const parts = [...headParts, ...fillers, ...tailParts];
  if (parts.length !== 8) return null;
  const out: number[] = [];
  for (const p of parts) {
    if (!/^[0-9a-fA-F]{1,4}$/.test(p)) return null;
    out.push(parseInt(p, 16));
  }
  return out;
}

function isPrivateIPv6(ip: string): boolean {
  const parts = expandIPv6(ip);
  if (!parts) return true;
  const [h0, h1, h2, h3, h4, h5, h6, h7] = parts;
  if (parts.every((p) => p === 0)) return true; // ::
  if (h0 === 0 && h1 === 0 && h2 === 0 && h3 === 0 && h4 === 0 && h5 === 0 && h6 === 0 && h7 === 1) return true; // ::1
  if ((h0 & 0xfe00) === 0xfc00) return true; // fc00::/7 ULA
  if ((h0 & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if (h0 >= 0xff00) return true; // ff00::/8 multicast
  // IPv4-mapped ::ffff:x.x.x.x
  if (h0 === 0 && h1 === 0 && h2 === 0 && h3 === 0 && h4 === 0 && h5 === 0xffff) {
    const v4 = `${(h6 >> 8) & 0xff}.${h6 & 0xff}.${(h7 >> 8) & 0xff}.${h7 & 0xff}`;
    return isPrivateIPv4(v4);
  }
  // 64:ff9b::/96 NAT64
  if (h0 === 0x0064 && h1 === 0xff9b && h2 === 0 && h3 === 0 && h4 === 0 && h5 === 0) {
    const v4 = `${(h6 >> 8) & 0xff}.${h6 & 0xff}.${(h7 >> 8) & 0xff}.${h7 & 0xff}`;
    return isPrivateIPv4(v4);
  }
  return false;
}

function isPrivateIp(ip: string): boolean {
  const family = net.isIP(ip);
  if (family === 4) return isPrivateIPv4(ip);
  if (family === 6) return isPrivateIPv6(ip);
  return true;
}

async function isHostnameSafe(hostname: string): Promise<boolean> {
  if (!hostname) return false;
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".localhost")) return false;
  if (net.isIP(hostname)) return !isPrivateIp(hostname);
  try {
    const records = await dns.lookup(hostname, { all: true, verbatim: true });
    if (records.length === 0) return false;
    for (const r of records) {
      if (isPrivateIp(r.address)) return false;
    }
    return true;
  } catch {
    return false;
  }
}

async function validatedUrl(value: string, base?: URL): Promise<URL | null> {
  let url: URL;
  try {
    url = new URL(value, base);
  } catch {
    return null;
  }
  if (!ALLOWED_PROTOCOLS.has(url.protocol)) return null;
  if (!(await isHostnameSafe(url.hostname))) return null;
  return url;
}

function pruneCache(): void {
  if (cache.size <= MAX_CACHE_ENTRIES) return;
  const now = Date.now();
  for (const [k, v] of cache) {
    if (v.expiresAt <= now) cache.delete(k);
  }
  if (cache.size <= MAX_CACHE_ENTRIES) return;
  const overflow = cache.size - MAX_CACHE_ENTRIES;
  let i = 0;
  for (const k of cache.keys()) {
    if (i++ >= overflow) break;
    cache.delete(k);
  }
}

function extractOgImage(html: string, baseUrl: URL): string | null {
  const metaTags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const candidates: Array<{ priority: number; content: string }> = [];
  for (const tag of metaTags) {
    const propMatch = tag.match(/\b(?:property|name)\s*=\s*["']([^"']+)["']/i);
    const contentMatch = tag.match(/\bcontent\s*=\s*["']([^"']+)["']/i);
    if (!propMatch || !contentMatch) continue;
    const prop = propMatch[1].toLowerCase();
    const content = contentMatch[1].trim();
    if (!content) continue;
    if (prop === "og:image" || prop === "og:image:url" || prop === "og:image:secure_url") {
      candidates.push({ priority: 1, content });
    } else if (prop === "twitter:image" || prop === "twitter:image:src") {
      candidates.push({ priority: 2, content });
    }
  }
  candidates.sort((a, b) => a.priority - b.priority);
  for (const { content } of candidates) {
    try {
      const resolved = new URL(content, baseUrl);
      if (ALLOWED_PROTOCOLS.has(resolved.protocol)) return resolved.toString();
    } catch {
      // skip invalid
    }
  }
  return null;
}

async function fetchHtmlNoRedirect(
  url: URL,
  signal: AbortSignal,
): Promise<Response | null> {
  try {
    return await fetch(url.toString(), {
      redirect: "manual",
      signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; CentofaiBot/1.0; +https://centofai.com)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
  } catch {
    return null;
  }
}

async function fetchOgImage(initialUrl: URL): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    let current: URL | null = initialUrl;
    let res: Response | null = null;
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      if (!current) return null;
      res = await fetchHtmlNoRedirect(current, controller.signal);
      if (!res) return null;
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get("location");
        if (!location) return null;
        if (hop === MAX_REDIRECTS) return null;
        current = await validatedUrl(location, current);
        continue;
      }
      break;
    }
    if (!res || !current || !res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") && !contentType.includes("xhtml")) {
      return null;
    }
    const reader = res.body?.getReader();
    if (!reader) return null;
    const decoder = new TextDecoder("utf-8", { fatal: false });
    let html = "";
    let received = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      received += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (received >= MAX_HTML_BYTES) {
        await reader.cancel().catch(() => {});
        break;
      }
    }
    html += decoder.decode();
    return extractOgImage(html, current);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

router.get("/og-image", async (req, res): Promise<void> => {
  const raw = req.query.url;
  if (typeof raw !== "string") {
    res.status(400).json({ error: "url query parameter is required" });
    return;
  }
  const url = await validatedUrl(raw);
  if (!url) {
    res.status(400).json({ error: "url must resolve to a public http(s) host" });
    return;
  }
  const key = url.toString();
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && cached.expiresAt > now) {
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.json({ imageUrl: cached.imageUrl, cached: true });
    return;
  }

  const imageUrl = await fetchOgImage(url);
  cache.set(key, {
    imageUrl,
    expiresAt: now + (imageUrl ? TTL_HIT_MS : TTL_MISS_MS),
  });
  pruneCache();
  req.log.info({ url: key, found: imageUrl !== null }, "og-image fetched");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.json({ imageUrl, cached: false });
});

export default router;
