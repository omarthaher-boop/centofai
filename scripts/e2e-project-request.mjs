const apiUrl = String(process.env.CENTOFAI_API_URL || "").replace(/\/$/, "");
const email = String(process.env.CENTOFAI_E2E_EMAIL || "").trim();

if (!apiUrl) throw new Error("CENTOFAI_API_URL is required");
if (!email) throw new Error("CENTOFAI_E2E_EMAIL is required");

const health = await fetch(`${apiUrl}/api/healthz`);
if (!health.ok) throw new Error(`Health check failed: ${health.status}`);

const fileContent = Buffer.from("CentofAi Phase 6E end-to-end attachment test", "utf8");
const payload = {
  projectType: "website",
  lang: "de",
  contactName: "CentofAi E2E Test",
  email,
  company: "CentofAi",
  projectTitle: "Phase 6E End-to-End Test",
  description: "Automatischer Produktionstest. Diese Anfrage kann nach erfolgreichem Test gelöscht werden.",
  timeline: "Test",
  budget: "Test",
  consent: true,
  summary: {
    environment: "production-e2e",
    purpose: "Validate API, database persistence, attachment handling and email delivery",
  },
  attachments: [
    {
      name: "centofai-e2e-test.txt",
      type: "text/plain",
      size: fileContent.byteLength,
      data: `data:text/plain;base64,${fileContent.toString("base64")}`,
    },
  ],
};

const response = await fetch(`${apiUrl}/api/project-requests`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const result = await response.json().catch(() => ({}));
if (!response.ok) {
  throw new Error(`Project request failed (${response.status}): ${JSON.stringify(result)}`);
}
if (!result.ok || !result.requestId || !result.proposalId) {
  throw new Error(`Unexpected response: ${JSON.stringify(result)}`);
}
if (!result.mailDelivered) {
  throw new Error(`Request ${result.requestId} was stored, but email delivery failed`);
}

console.log(`E2E success: ${result.requestId} / proposal ${result.proposalId}`);
