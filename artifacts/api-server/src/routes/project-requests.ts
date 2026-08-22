import { Router, type IRouter } from "express";
import { db, projectProposalsTable } from "@workspace/db";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const router: IRouter = Router();

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

type AttachmentInput = {
  name?: unknown;
  type?: unknown;
  size?: unknown;
  data?: unknown;
};

type ProjectRequestBody = {
  projectType?: unknown;
  lang?: unknown;
  contactName?: unknown;
  email?: unknown;
  company?: unknown;
  projectTitle?: unknown;
  description?: unknown;
  timeline?: unknown;
  budget?: unknown;
  summary?: unknown;
  consent?: unknown;
  attachments?: unknown;
};

function text(value: unknown, max = 10_000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sanitizeFilename(value: string): string {
  return value.replace(/[^a-zA-Z0-9._ -]/g, "_").slice(0, 120) || "attachment";
}

function decodeAttachments(value: unknown) {
  if (!Array.isArray(value)) return [];
  let total = 0;
  return value.slice(0, 8).map((raw: AttachmentInput) => {
    const name = sanitizeFilename(text(raw?.name, 120));
    const type = text(raw?.type, 120).toLowerCase();
    const declaredSize = Number(raw?.size ?? 0);
    const data = text(raw?.data, 30_000_000);
    if (!name || !allowedMimeTypes.has(type) || !data) throw new Error("INVALID_ATTACHMENT");
    const base64 = data.includes(",") ? data.slice(data.indexOf(",") + 1) : data;
    const buffer = Buffer.from(base64, "base64");
    if (buffer.byteLength === 0 || buffer.byteLength > MAX_FILE_BYTES) throw new Error("FILE_TOO_LARGE");
    if (declaredSize && Math.abs(buffer.byteLength - declaredSize) > 16) throw new Error("INVALID_ATTACHMENT");
    total += buffer.byteLength;
    if (total > MAX_TOTAL_BYTES) throw new Error("TOTAL_TOO_LARGE");
    return { filename: name, contentType: type, content: buffer };
  });
}

const smtpTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.infomaniak.com",
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: process.env.SMTP_USER && process.env.SMTP_PASS
    ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    : undefined,
});

async function sendMail(args: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: { filename: string; contentType: string; content: Buffer }[];
}) {
  const fromEmail = process.env.PROJECT_FROM_EMAIL || process.env.SMTP_USER || "info@centof.ai";
  const fromName = process.env.PROJECT_FROM_NAME || "CentofAi";

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [args.to],
      replyTo: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
      attachments: args.attachments?.map((a) => ({ filename: a.filename, content: a.content })),
    });
    if (result.error) throw new Error(result.error.message);
    return;
  }

  if (!process.env.SMTP_PASS) throw new Error("MAIL_NOT_CONFIGURED");
  await smtpTransport.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: args.to,
    replyTo: args.replyTo,
    subject: args.subject,
    html: args.html,
    text: args.text,
    attachments: args.attachments,
  });
}

router.post("/project-requests", async (req, res): Promise<void> => {
  const body = (req.body || {}) as ProjectRequestBody;
  const projectType = text(body.projectType, 40);
  const lang = text(body.lang, 4) === "en" ? "en" : "de";
  const contactName = text(body.contactName, 180);
  const email = text(body.email, 254).toLowerCase();
  const company = text(body.company, 240);
  const projectTitle = text(body.projectTitle, 240);
  const description = text(body.description, 12_000);
  const timeline = text(body.timeline, 120);
  const budget = text(body.budget, 120);
  const consent = body.consent === true;
  const summary = body.summary && typeof body.summary === "object" ? body.summary : {};

  if (!new Set(["website", "app", "ai"]).has(projectType)) {
    res.status(400).json({ error: "invalid_project_type" });
    return;
  }
  if (!contactName || !email || !email.includes("@") || !consent) {
    res.status(400).json({ error: "missing_required_fields" });
    return;
  }

  let attachments: ReturnType<typeof decodeAttachments> = [];
  try {
    attachments = decodeAttachments(body.attachments);
  } catch (error) {
    const code = (error as Error).message;
    res.status(400).json({ error: code.toLowerCase() });
    return;
  }

  const requestId = `CAI-${Date.now().toString(36).toUpperCase()}`;
  const summaryJson = JSON.stringify(summary, null, 2).slice(0, 80_000);
  const idea = [
    `Request ID: ${requestId}`,
    `Project type: ${projectType}`,
    `Project title: ${projectTitle || "—"}`,
    `Company: ${company || "—"}`,
    `Description: ${description || "—"}`,
    "",
    "Configuration:",
    summaryJson,
  ].join("\n");

  try {
    const [proposal] = await db.insert(projectProposalsTable).values({
      name: contactName,
      email,
      idea,
      budget: budget || null,
      timeline: timeline || null,
    }).returning();

    const target = process.env.PROJECT_INBOX || "info@centof.ai";
    const typeLabel = projectType === "website" ? "Website" : projectType === "app" ? "Mobile App" : "KI-Tool / Automation";
    const safeDescription = escapeHtml(description || "—").replaceAll("\n", "<br>");
    const safeSummary = escapeHtml(summaryJson);

    const ownerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;color:#17172d">
        <h1 style="margin-bottom:4px">Neue CentofAi Projektanfrage</h1>
        <p style="color:#625f79">${escapeHtml(typeLabel)} · ${escapeHtml(requestId)}</p>
        <hr style="border:0;border-top:1px solid #ececf3;margin:24px 0">
        <p><strong>Name:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Unternehmen:</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Projekttitel:</strong> ${escapeHtml(projectTitle || "—")}</p>
        <p><strong>Zeitrahmen:</strong> ${escapeHtml(timeline || "—")}</p>
        <p><strong>Budget:</strong> ${escapeHtml(budget || "—")}</p>
        <h2 style="margin-top:28px">Projektbeschreibung</h2><p>${safeDescription}</p>
        <h2 style="margin-top:28px">Konfiguration</h2>
        <pre style="white-space:pre-wrap;background:#f6f6fb;padding:18px;border-radius:12px;font-size:12px">${safeSummary}</pre>
        <p style="color:#777;font-size:12px">Datenbank-ID: ${proposal.id} · Dateien: ${attachments.length}</p>
      </div>`;

    const confirmationDe = {
      subject: `Projektanfrage erhalten · ${requestId}`,
      intro: "Vielen Dank für deine Projektanfrage bei CentofAi.",
      detail: "Wir haben deine Angaben erhalten und prüfen dein Projekt sorgfältig. Wir melden uns mit einer ersten Einschätzung und den nächsten sinnvollen Schritten.",
      footer: "Websites, Apps & KI-Tools. Mit KI gebaut. Von Menschen perfektioniert.",
    };
    const confirmationEn = {
      subject: `Project request received · ${requestId}`,
      intro: "Thank you for your project request to CentofAi.",
      detail: "We received your information and will review your project carefully. We’ll get back to you with an initial assessment and sensible next steps.",
      footer: "Websites, Apps & AI Tools. Built with AI. Perfected by people.",
    };
    const confirmation = lang === "en" ? confirmationEn : confirmationDe;
    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#17172d;padding:18px">
        <div style="font-size:22px;font-weight:800;margin-bottom:28px">centof.ai</div>
        <h1>${escapeHtml(confirmation.intro)}</h1>
        <p style="font-size:16px;line-height:1.65;color:#56566d">${escapeHtml(confirmation.detail)}</p>
        <div style="background:#f5f5fb;border-radius:14px;padding:18px;margin:24px 0">
          <strong>${escapeHtml(requestId)}</strong><br>
          ${escapeHtml(typeLabel)}${projectTitle ? ` · ${escapeHtml(projectTitle)}` : ""}
        </div>
        <p style="font-size:13px;color:#777">${escapeHtml(confirmation.footer)}</p>
      </div>`;

    let mailDelivered = true;
    try {
      await sendMail({
        to: target,
        replyTo: email,
        subject: `[${requestId}] Neue ${typeLabel}-Projektanfrage`,
        html: ownerHtml,
        text: idea,
        attachments,
      });
      await sendMail({
        to: email,
        subject: confirmation.subject,
        html: customerHtml,
        text: `${confirmation.intro}\n\n${confirmation.detail}\n\n${requestId}`,
      });
    } catch (mailError) {
      mailDelivered = false;
      req.log.error({ error: (mailError as Error).message, requestId }, "Project email delivery failed");
    }

    req.log.info({ requestId, proposalId: proposal.id, projectType, mailDelivered }, "Project request accepted");
    res.status(201).json({ ok: true, requestId, proposalId: proposal.id, mailDelivered });
  } catch (error) {
    req.log.error({ error: (error as Error).message, requestId }, "Project request failed");
    res.status(500).json({ error: "project_request_failed" });
  }
});

export default router;
