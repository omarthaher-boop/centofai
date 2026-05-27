import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..");
const toolsFile = path.join(
  repoRoot,
  "artifacts",
  "centofai",
  "src",
  "data",
  "tools.ts",
);
const outDir = path.join(
  repoRoot,
  "artifacts",
  "centofai",
  "public",
  "tool-logos",
);

function hostnameFor(url: string): string | null {
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h.startsWith("www.") ? h.slice(4) : h;
  } catch {
    return null;
  }
}

function slugFor(host: string): string {
  return host.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
const JPG_SIG = Buffer.from([0xff, 0xd8, 0xff]);
const GIF_SIG = Buffer.from([0x47, 0x49, 0x46, 0x38]);
const WEBP_RIFF = Buffer.from([0x52, 0x49, 0x46, 0x46]);
const ICO_SIG = Buffer.from([0x00, 0x00, 0x01, 0x00]);

function detectExt(buf: Buffer, contentType?: string): string | null {
  if (buf.length >= 4 && buf.subarray(0, 4).equals(PNG_SIG)) return "png";
  if (buf.length >= 3 && buf.subarray(0, 3).equals(JPG_SIG)) return "jpg";
  if (buf.length >= 4 && buf.subarray(0, 4).equals(GIF_SIG)) return "gif";
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).equals(WEBP_RIFF) &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  )
    return "webp";
  if (buf.length >= 4 && buf.subarray(0, 4).equals(ICO_SIG)) return "ico";
  const head = buf.subarray(0, Math.min(buf.length, 512)).toString("utf8");
  if (head.includes("<svg") || head.includes("<?xml")) return "svg";
  if (contentType?.includes("svg")) return "svg";
  if (contentType?.includes("png")) return "png";
  if (contentType?.includes("jpeg") || contentType?.includes("jpg")) return "jpg";
  if (contentType?.includes("webp")) return "webp";
  if (contentType?.includes("gif")) return "gif";
  if (contentType?.includes("icon") || contentType?.includes("ico")) return "ico";
  return null;
}

async function tryFetch(
  url: string,
  minBytes = 200,
): Promise<{ buf: Buffer; ext: string } | null> {
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; CentofaiLogoFetcher/1.0; +https://centofai)",
      },
    });
    if (!res.ok) return null;
    const ab = await res.arrayBuffer();
    const buf = Buffer.from(ab);
    if (buf.length < minBytes) return null;
    const ext = detectExt(buf, res.headers.get("content-type") ?? undefined);
    if (!ext) return null;
    return { buf, ext };
  } catch {
    return null;
  }
}

async function downloadLogo(
  host: string,
): Promise<{ buf: Buffer; ext: string } | null> {
  const clearbit = await tryFetch(
    `https://logo.clearbit.com/${host}?size=256`,
    400,
  );
  if (clearbit) return clearbit;
  const ddg = await tryFetch(`https://icons.duckduckgo.com/ip3/${host}.ico`, 400);
  if (ddg) return ddg;
  const google = await tryFetch(
    `https://www.google.com/s2/favicons?domain=${host}&sz=256`,
    400,
  );
  if (google) return google;
  return null;
}

function generateSvgLogo(letter: string, color: string): Buffer {
  const safeLetter = letter.replace(/[<>&"']/g, "").slice(0, 1).toUpperCase() || "?";
  const safeColor = /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : "#6366F1";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" rx="48" fill="${safeColor}"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" font-size="148" font-weight="700" fill="#ffffff">${safeLetter}</text></svg>`;
  return Buffer.from(svg, "utf8");
}

interface ToolInfo {
  name: string;
  color: string;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const src = await readFile(toolsFile, "utf8");

  // Build host -> representative tool info (first occurrence wins)
  const toolEntryRe =
    /\{\s*name:\s*"([^"]+)"[^}]*?url:\s*"([^"]+)"[^}]*?color:\s*"(#[0-9a-fA-F]{3,8})"/g;
  const hostInfo = new Map<string, ToolInfo>();
  for (const m of src.matchAll(toolEntryRe)) {
    const host = hostnameFor(m[2]);
    if (!host) continue;
    if (!hostInfo.has(host)) {
      hostInfo.set(host, { name: m[1], color: m[3] });
    }
  }

  const hostToSlugExt = new Map<string, { slug: string; ext: string }>();
  let ok = 0;
  let generated = 0;
  for (const [host, info] of hostInfo) {
    const slug = slugFor(host);
    const result = await downloadLogo(host);
    let chosen: { buf: Buffer; ext: string };
    if (result) {
      chosen = result;
      console.log(`[ok]   ${host} -> ${slug}.${result.ext} (${result.buf.length}B)`);
      ok++;
    } else {
      const buf = generateSvgLogo(info.name.charAt(0), info.color);
      chosen = { buf, ext: "svg" };
      console.warn(`[gen]  ${host} -> ${slug}.svg (generated brand fallback)`);
      generated++;
    }
    const filename = `${slug}.${chosen.ext}`;
    await writeFile(path.join(outDir, filename), chosen.buf);
    hostToSlugExt.set(host, { slug, ext: chosen.ext });
  }

  // Rewrite tools.ts: ensure each tool entry has a logoUrl matching its hostname.
  const lines = src.split("\n");
  let patched = 0;
  let missing = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const urlMatch = line.match(/url:\s*"([^"]+)"/);
    if (!urlMatch) continue;
    const host = hostnameFor(urlMatch[1]);
    if (!host) continue;
    const entry = hostToSlugExt.get(host);
    if (!entry) {
      missing++;
      continue;
    }
    const local = `tool-logos/${entry.slug}.${entry.ext}`;
    let updated = line.replace(/,\s*logoUrl:\s*"[^"]*"/g, "");
    const closeIdx = updated.lastIndexOf("}");
    if (closeIdx === -1) continue;
    const before = updated.slice(0, closeIdx).replace(/\s+$/, "");
    const after = updated.slice(closeIdx);
    updated = `${before}, logoUrl: "${local}" ${after}`;
    if (updated !== line) {
      lines[i] = updated;
      patched++;
    }
  }
  await writeFile(toolsFile, lines.join("\n"), "utf8");

  console.log(
    `\nDone. ${ok} downloaded, ${generated} generated SVG fallbacks, ${patched} tool entries patched, ${missing} entries with no host match.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
