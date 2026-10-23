// Receives the site's forms and emails them. Where each one goes is decided
// here, on the server, from the kind of form, never from anything the browser
// sends: job applications go to the careers inbox; contact messages and demo
// requests go to the info inbox.
//
// Mail is sent through Resend (https://resend.com). It needs two settings in
// the environment: RESEND_API_KEY, and MAIL_FROM, an address on a domain
// verified in Resend, such as "Rizviz Website <website@rizviz.com.pk>".

const INBOX = {
  application: "careers@rizviz.com.pk",
  contact: "info@rizviz.com.pk",
  demo: "info@rizviz.com.pk",
} as const;

type Kind = keyof typeof INBOX;

const SUBJECT: Record<Kind, string> = {
  application: "New job application",
  contact: "New contact message",
  demo: "New demo request",
};

const MAX_CV_BYTES = 5 * 1024 * 1024;

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// "firstName" -> "First name"
const labelOf = (key: string) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) {
    return Response.json(
      { error: "Sending is not set up yet. Please email us directly." },
      { status: 503 },
    );
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return Response.json({ error: "That could not be read." }, { status: 400 });
  }

  const kind = String(data.get("kind") ?? "") as Kind;
  if (!(kind in INBOX)) {
    return Response.json({ error: "Unknown form." }, { status: 400 });
  }

  const rows: [string, string][] = [];
  const attachments: { filename: string; content: string }[] = [];
  let replyTo: string | undefined;
  let subject = SUBJECT[kind];

  for (const [key, value] of data.entries()) {
    if (key === "kind") continue;
    if (value instanceof File) {
      if (!value.size) continue;
      if (value.size > MAX_CV_BYTES) {
        return Response.json(
          { error: "Please upload a CV smaller than 5 MB." },
          { status: 413 },
        );
      }
      attachments.push({
        filename: value.name || "attachment",
        content: Buffer.from(await value.arrayBuffer()).toString("base64"),
      });
      continue;
    }
    const text = String(value).trim();
    if (!text) continue;
    rows.push([labelOf(key), text]);
    if (key === "email" && /^[^\s@]+@[^\s@]+$/.test(text)) replyTo = text;
  }

  if (kind === "demo") {
    const product = rows.find(([k]) => k === "Product")?.[1];
    if (product) subject = `${subject}: ${product}`;
  }
  if (kind === "application") {
    const role = rows.find(([k]) => /role|position/i.test(k))?.[1];
    if (role) subject = `${subject}: ${role}`;
  }

  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #e3ecf3;color:#59677c;vertical-align:top"><b>${escapeHtml(k)}</b></td><td style="border-bottom:1px solid #e3ecf3;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [INBOX[kind]],
      subject,
      html,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      reply_to: replyTo,
      attachments: attachments.length ? attachments : undefined,
    }),
  });

  if (!res.ok) {
    return Response.json(
      { error: "We could not send that. Please try again shortly." },
      { status: 502 },
    );
  }
  return Response.json({ ok: true });
}
