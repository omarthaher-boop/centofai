import { Router, type IRouter } from "express";
import { db, projectProposalsTable } from "@workspace/db";
import { CreateProposalBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import nodemailer from "nodemailer";

const router: IRouter = Router();

// Create email transporter using Infomaniak SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.infomaniak.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER || "info@centofai.com",
    pass: process.env.SMTP_PASS || "",
  },
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    logger.warn({ error: error.message }, "SMTP connection not configured — email sending disabled");
  } else {
    logger.info("SMTP connection ready for info@centofai.com");
  }
});

router.post("/proposals", async (req, res): Promise<void> => {
  const parsed = CreateProposalBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid proposal request");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;

  try {
    // Save to database
    const [proposal] = await db
      .insert(projectProposalsTable)
      .values(data)
      .returning();

    req.log.info({ proposalId: proposal.id }, "Project proposal saved");

    // Send email notification to info@centofai.com
    if (process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"CentofAi" <${process.env.SMTP_USER || "info@centofai.com"}>`,
          to: "info@centofai.com",
          replyTo: data.email,
          subject: `Neuer Projekt-Vorschlag von ${data.name}`,
          text: `Neuer Projekt-Vorschlag eingegangen:

Name: ${data.name}
E-Mail: ${data.email}
Budget: ${data.budget || "nicht angegeben"}
Zeitrahmen: ${data.timeline || "nicht angegeben"}

Idee:
${data.idea}

---
Gesendet via CentofAi Projektformular`,
          html: `
            <h2>Neuer Projekt-Vorschlag</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Budget:</strong> ${data.budget || "nicht angegeben"}</p>
            <p><strong>Zeitrahmen:</strong> ${data.timeline || "nicht angegeben"}</p>
            <h3>Idee:</h3>
            <p style="white-space:pre-wrap">${data.idea.replace(/\n/g, "<br>")}</p>
            <hr>
            <p style="color:#666;font-size:12px">Gesendet via CentofAi Projektformular</p>
          `,
        });

        req.log.info({ proposalId: proposal.id }, "Proposal email sent to info@centofai.com");
      } catch (emailError) {
        req.log.error({ error: (emailError as Error).message }, "Failed to send proposal email");
        // Don't fail the request — the proposal is still saved
      }
    } else {
      req.log.info("SMTP not configured — proposal saved but no email sent");
    }

    res.status(201).json({
      id: proposal.id,
      name: proposal.name,
      email: proposal.email,
      idea: proposal.idea,
      budget: proposal.budget ?? undefined,
      timeline: proposal.timeline ?? undefined,
      createdAt: proposal.createdAt.toISOString(),
    });
  } catch (error) {
    req.log.error({ error: (error as Error).message }, "Failed to save proposal");
    res.status(500).json({ error: "Failed to process proposal" });
    return;
  }
});

export default router;
