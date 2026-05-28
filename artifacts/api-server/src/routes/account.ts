import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { createClerkClient } from "@clerk/express";
import {
  db,
  favoritesTable,
  toolSubmissionsTable,
} from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";

const router: IRouter = Router();

router.delete("/account", requireAuth, async (req, res): Promise<void> => {
  const userId = req.userId!;
  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    req.log.error("CLERK_SECRET_KEY is not configured");
    res.status(500).json({ error: "Account deletion is not configured" });
    return;
  }

  try {
    await db.delete(favoritesTable).where(eq(favoritesTable.userId, userId));
    await db
      .delete(toolSubmissionsTable)
      .where(eq(toolSubmissionsTable.userId, userId));

    const clerk = createClerkClient({ secretKey });
    await clerk.users.deleteUser(userId);

    res.status(204).end();
  } catch (err) {
    req.log.error(
      { err: (err as Error).message },
      "Failed to delete account",
    );
    res.status(500).json({ error: "Failed to delete account" });
  }
});

export default router;
