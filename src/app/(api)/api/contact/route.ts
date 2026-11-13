import { type NextRequest, NextResponse } from "next/server";

interface ContactFields {
  name: string;
  email: string;
  message: string;
  /** Visitor asked for the résumé (sent by hand; it isn't public). */
  resume: boolean;
}

const SERVER_ERRORS = new Set([
  "Server misconfigured.",
  "Failed to send message.",
]);

const MAX_LENGTH = { name: 200, email: 320, message: 10_000 } as const;

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] ?? c,
  );

const field = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

/** Accepts JSON (the enhanced form) or a native form post (no JS). */
async function readFields(req: NextRequest): Promise<ContactFields | null> {
  const type = req.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const data: unknown = await req.json();
      if (!data || typeof data !== "object") return null;
      const { name, email, message, resume } = data as Record<string, unknown>;
      return {
        name: field(name),
        email: field(email),
        message: field(message),
        resume: resume === true,
      };
    }
    const form = await req.formData();
    return {
      name: field(form.get("name")),
      email: field(form.get("email")),
      message: field(form.get("message")),
      resume: form.get("resume") === "yes",
    };
  } catch {
    return null;
  }
}

/** Sends the message; resolves to an error message, or null on success. */
async function deliver({ name, email, message, resume }: ContactFields) {
  if (!name || !email || !message) return "All fields are required.";
  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    message.length > MAX_LENGTH.message
  ) {
    return "That message is too long.";
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error("Missing RESEND_API_KEY or CONTACT_EMAIL env vars");
    return "Server misconfigured.";
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `[${resume ? "Résumé request" : "Contact"}] Message from ${name.replace(/[\r\n]+/g, " ")}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${resume ? "<p><strong>Résumé requested:</strong> yes</p>" : ""}
        <hr/>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch((error: unknown) => {
    console.error("Resend request failed:", error);
    return null;
  });

  if (!res?.ok) {
    if (res) console.error("Resend error:", await res.text());
    return "Failed to send message.";
  }
  return null;
}

export async function POST(req: NextRequest) {
  const isJson = (req.headers.get("content-type") ?? "").includes(
    "application/json",
  );
  const fields = await readFields(req);
  const error = fields ? await deliver(fields) : "Invalid request.";

  if (isJson) {
    return error
      ? NextResponse.json(
          { error },
          { status: SERVER_ERRORS.has(error) ? 500 : 400 },
        )
      : NextResponse.json({ success: true });
  }

  // Native form post (JavaScript off): land on a static result page.
  return NextResponse.redirect(
    new URL(error ? "/contact/failed" : "/contact/sent", req.url),
    303,
  );
}
