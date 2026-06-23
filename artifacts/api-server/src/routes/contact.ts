import { Router, type IRouter } from "express";
import { resend } from "../lib/resend";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const { name, email, telefon, nachricht } = req.body as {
    name?: string;
    email?: string;
    telefon?: string;
    nachricht?: string;
  };

  if (!name?.trim() || !email?.trim() || !email.includes("@") || !nachricht?.trim()) {
    res.status(400).json({ error: "Ungültige Eingabe." });
    return;
  }

  try {
    await resend.emails.send({
      from: "Centof.Ai Kontakt <info@centof.ai>",
      to: "info@centof.ai",
      replyTo: email,
      subject: `Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; padding: 40px 32px; border-radius: 12px;">
          <h2 style="color: #a78bfa; font-size: 22px; margin-bottom: 4px;">Neue Kontaktanfrage</h2>
          <p style="color: #6e7681; font-size: 13px; margin-bottom: 32px;">Eingegangen über centof.ai/kontakt</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #8b949e; font-size: 13px; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #e6edf3; font-size: 15px; font-weight: 500;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #21262d;">
              <td style="padding: 10px 0; color: #8b949e; font-size: 13px; vertical-align: top;">E-Mail</td>
              <td style="padding: 10px 0; color: #a78bfa; font-size: 15px;">
                <a href="mailto:${email}" style="color: #a78bfa;">${email}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid #21262d;">
              <td style="padding: 10px 0; color: #8b949e; font-size: 13px; vertical-align: top;">Telefon</td>
              <td style="padding: 10px 0; color: #e6edf3; font-size: 15px;">${telefon || "— nicht angegeben —"}</td>
            </tr>
            <tr style="border-top: 1px solid #21262d;">
              <td style="padding: 10px 0; color: #8b949e; font-size: 13px; vertical-align: top;">Nachricht</td>
              <td style="padding: 10px 0; color: #e6edf3; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${nachricht}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #21262d; margin: 32px 0;" />
          <a href="mailto:${email}" style="display: inline-block; background: #7c3aed; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Direkt antworten →
          </a>
        </div>
      `,
    });

    req.log.info({ name, email }, "Kontaktanfrage gesendet");
    res.status(200).json({ success: true });
  } catch (err) {
    req.log.error({ error: (err as Error).message }, "Kontaktanfrage fehlgeschlagen");
    res.status(500).json({ error: "E-Mail konnte nicht gesendet werden." });
  }
});

export default router;
