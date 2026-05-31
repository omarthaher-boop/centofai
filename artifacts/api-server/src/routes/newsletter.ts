import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable, insertNewsletterSubscriberSchema } from "@workspace/db";

const router: IRouter = Router();

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = insertNewsletterSubscriberSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Ungültige E-Mail-Adresse" });
    return;
  }

  try {
    await db
      .insert(newsletterSubscribersTable)
      .values({ email: parsed.data.email })
      .onConflictDoNothing();

    req.log.info({ email: parsed.data.email }, "Newsletter subscription saved");
    res.status(201).json({ success: true });
  } catch (error) {
    req.log.error({ error: (error as Error).message }, "Failed to save newsletter subscription");
    res.status(500).json({ error: "Fehler beim Speichern" });
  }
});

export default router;
