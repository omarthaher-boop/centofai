export type ProjectKind = "website" | "app" | "ai";

export type ProjectSubmission = {
  projectType: ProjectKind;
  lang: "de" | "en";
  contactName: string;
  email: string;
  company?: string;
  projectTitle?: string;
  description?: string;
  timeline?: string;
  budget?: string;
  summary: Record<string, unknown>;
  consent: boolean;
  files?: File[];
};

export type ProjectSubmissionResult = {
  ok: true;
  requestId: string;
  proposalId: number;
  mailDelivered: boolean;
};

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
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

function apiBase(): string {
  const explicit = String(import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  if (explicit) return explicit.endsWith("/api") ? explicit : `${explicit}/api`;
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/api`;
}

function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("file_read_failed"));
    reader.readAsDataURL(file);
  });
}

async function prepareFiles(files: File[]) {
  let total = 0;
  const selected = files.slice(0, 8);
  return Promise.all(selected.map(async (file) => {
    if (!ALLOWED_TYPES.has(file.type)) throw new Error("unsupported_file_type");
    if (file.size > MAX_FILE_BYTES) throw new Error("file_too_large");
    total += file.size;
    if (total > MAX_TOTAL_BYTES) throw new Error("total_files_too_large");
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      data: await toDataUrl(file),
    };
  }));
}

export async function submitProjectRequest(input: ProjectSubmission): Promise<ProjectSubmissionResult> {
  if (!input.contactName.trim() || !input.email.trim() || !input.consent) {
    throw new Error("missing_required_fields");
  }

  const attachments = await prepareFiles(input.files || []);
  const response = await fetch(`${apiBase()}/project-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ...input, files: undefined, attachments }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `request_failed_${response.status}`);
  return data as ProjectSubmissionResult;
}

export function projectSubmitErrorMessage(error: unknown, lang: "de" | "en"): string {
  const code = error instanceof Error ? error.message : "unknown";
  const messages: Record<string, [string, string]> = {
    missing_required_fields: ["Bitte Name, E-Mail und Datenschutz-Einwilligung prüfen.", "Please check name, email and privacy consent."],
    unsupported_file_type: ["Mindestens eine Datei hat ein nicht unterstütztes Format.", "At least one file has an unsupported format."],
    invalid_attachment: ["Eine Datei konnte nicht sicher verarbeitet werden.", "A file could not be processed safely."],
    file_too_large: ["Eine Datei ist größer als 10 MB.", "One file is larger than 10 MB."],
    total_files_too_large: ["Die Dateien sind zusammen größer als 20 MB.", "The files exceed 20 MB in total."],
    total_too_large: ["Die Dateien sind zusammen größer als 20 MB.", "The files exceed 20 MB in total."],
    mail_not_configured: ["Der E-Mail-Versand ist noch nicht konfiguriert.", "Email delivery is not configured yet."],
  };
  const pair = messages[code];
  if (pair) return lang === "de" ? pair[0] : pair[1];
  return lang === "de"
    ? "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuche es erneut."
    : "The request could not be sent right now. Please try again.";
}
