import { Router, type IRouter } from "express";
import { tools, newsItems, courses } from "@workspace/data";

const router: IRouter = Router();

function score(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t === q) return 100;
  if (t.startsWith(q)) return 80;
  if (t.includes(q)) return 60;
  const words = q.split(/\s+/);
  let matches = 0;
  for (const w of words) {
    if (t.includes(w)) matches++;
  }
  return matches > 0 ? (matches / words.length) * 40 : 0;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "x"
  );
}

router.get("/search", async (req, res): Promise<void> => {
  const raw = req.query.q;
  if (typeof raw !== "string" || !raw.trim()) {
    res.status(400).json({ error: "Query parameter 'q' is required and must be a non-empty string" });
    return;
  }
  const q = raw.trim();
  if (q.length > 100) {
    res.status(400).json({ error: "Query exceeds maximum length of 100 characters" });
    return;
  }

  const matchedTools = tools
    .map((t) => ({
      name: t.name,
      category: t.category,
      description: t.description,
      pricing: t.pricing,
      url: t.url,
      color: t.color,
      logoUrl: t.logoUrl ?? null,
      audience: t.audience,
      slug: slugify(t.name),
      score: Math.max(
        score(q, t.name),
        score(q, t.description),
        score(q, t.category),
      ),
    }))
    .filter((t: { score: number }) => t.score > 0)
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 10)
    .map(({ score: _, ...rest }: { score: number; [key: string]: any }) => rest);

  const matchedNews = newsItems
    .map((n) => ({
      title: n.title,
      description: n.description,
      source: n.source,
      date: n.date,
      url: n.url,
      category: n.category,
      imageUrl: n.imageUrl ?? null,
      score: Math.max(
        score(q, n.title),
        score(q, n.description),
        score(q, n.category),
        score(q, n.source),
      ),
    }))
    .filter((n: { score: number }) => n.score > 0)
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 10)
    .map(({ score: _, ...rest }: { score: number; [key: string]: any }) => rest);

  const matchedCourses = courses
    .map((c) => ({
      name: c.name,
      provider: c.provider,
      level: c.level,
      language: c.language,
      pricing: c.pricing,
      description: c.description,
      url: c.url,
      category: c.category,
      score: Math.max(
        score(q, c.name),
        score(q, c.description),
        score(q, c.category),
        score(q, c.provider),
      ),
    }))
    .filter((c: { score: number }) => c.score > 0)
    .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
    .slice(0, 10)
    .map(({ score: _, ...rest }: { score: number; [key: string]: any }) => rest);

  res.json({
    tools: matchedTools,
    news: matchedNews,
    courses: matchedCourses,
  });
});

export default router;
