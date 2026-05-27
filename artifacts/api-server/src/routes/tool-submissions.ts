import { Router, type IRouter } from "express";
import { db, toolSubmissionsTable } from "@workspace/db";
import { SubmitToolBody } from "@workspace/api-zod";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.post(
  "/tool-submissions",
  requireAuth,
  async (req, res): Promise<void> => {
    const parsed = SubmitToolBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }
    try {
      const [row] = await db
        .insert(toolSubmissionsTable)
        .values({ ...parsed.data, userId: req.userId! })
        .returning();
      res.status(201).json({
        id: row.id,
        name: row.name,
        category: row.category,
        description: row.description,
        pricing: row.pricing,
        audience: row.audience ?? undefined,
        url: row.url,
        status: row.status,
        createdAt: row.createdAt.toISOString(),
      });
    } catch (err) {
      req.log.error(
        { err: (err as Error).message },
        "Failed to save tool submission",
      );
      res.status(500).json({ error: "Failed to save submission" });
    }
  },
);

export default router;
