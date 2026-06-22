import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable, insertNewsletterSubscriberSchema } from "@workspace/db";
import { resend } from "../lib/resend";

const router: IRouter = Router();

router.post("/newsletter", async (req, res): Promise<void> => {
  const parsed = insertNewsletterSubscriberSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Ungültige E-Mail-Adresse" });
    return;
  }

  const email = parsed.data.email;

  try {
    await db
      .insert(newsletterSubscribersTable)
      .values({ email })
      .onConflictDoNothing();

    req.log.info({ email }, "Newsletter subscription saved");

    try {
      await resend.emails.send({
        from: "Centof.Ai <info@centof.ai>",
        to: email,
        subject: "Willkommen bei Centof.Ai 🎉",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 40px 32px; border-radius: 12px;">
            <h1 style="color: #a78bfa; font-size: 28px; margin-bottom: 8px;">Willkommen bei Centof.Ai!</h1>
            <p style="color: #8b949e; font-size: 16px; margin-bottom: 24px;">Dein zentraler KI-Hub & Verzeichnis</p>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Schön, dass du dabei bist! Du erhältst ab jetzt die neuesten Infos rund um KI-Tools, Kurse und Entwicklungen direkt in dein Postfach.
            </p>

            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              In der Zwischenzeit kannst du schon mal unsere <strong style="color: #a78bfa;">102+ KI-Tools</strong> entdecken oder einen unserer Kurse starten.
            </p>

            <a href="https://centof.ai" style="display: inline-block; background: #7c3aed; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Zu Centof.Ai →
            </a>

            <hr style="border: none; border-top: 1px solid #21262d; margin: 40px 0;" />
            <p style="color: #6e7681; font-size: 13px;">
              Du erhältst diese E-Mail, weil du dich für den Centof.Ai Newsletter angemeldet hast.<br/>
              <a href="https://centof.ai" style="color: #8b949e;">centof.ai</a>
            </p>
          </div>
        `,
      });
      req.log.info({ email }, "Welcome email sent via Resend");
    } catch (mailErr) {
      req.log.warn({ error: (mailErr as Error).message }, "Welcome email failed but subscription was saved");
    }

    res.status(201).json({ success: true });
  } catch (error) {
    req.log.error({ error: (error as Error).message }, "Failed to save newsletter subscription");
    res.status(500).json({ error: "Fehler beim Speichern" });
  }
});

export default router;
