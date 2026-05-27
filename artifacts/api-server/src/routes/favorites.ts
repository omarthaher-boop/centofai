import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, favoritesTable } from "@workspace/db";
import { AddFavoriteBody } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.get("/favorites", requireAuth, async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(favoritesTable)
    .where(eq(favoritesTable.userId, req.userId!))
    .orderBy(desc(favoritesTable.createdAt));
  res.json(
    rows.map((r) => ({
      id: r.id,
      toolName: r.toolName,
      createdAt: r.createdAt.toISOString(),
    })),
  );
});

router.post("/favorites", requireAuth, async (req, res): Promise<void> => {
  const parsed = AddFavoriteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { toolName } = parsed.data;
  try {
    const [row] = await db
      .insert(favoritesTable)
      .values({ userId: req.userId!, toolName })
      .onConflictDoNothing()
      .returning();
    if (row) {
      res.status(201).json({
        id: row.id,
        toolName: row.toolName,
        createdAt: row.createdAt.toISOString(),
      });
      return;
    }
    const [existing] = await db
      .select()
      .from(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, req.userId!),
          eq(favoritesTable.toolName, toolName),
        ),
      );
    res.status(201).json({
      id: existing.id,
      toolName: existing.toolName,
      createdAt: existing.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err: (err as Error).message }, "Failed to add favorite");
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

router.delete(
  "/favorites/:toolName",
  requireAuth,
  async (req, res): Promise<void> => {
    const toolName = String(req.params.toolName);
    await db
      .delete(favoritesTable)
      .where(
        and(
          eq(favoritesTable.userId, req.userId!),
          eq(favoritesTable.toolName, toolName),
        ),
      );
    res.status(204).end();
  },
);

export default router;
