"use client";

import { type FormEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import { buttonPrimary } from "@/components/Button/buttonClasses";

type Status =
  | { state: "idle" }
  | { state: "pending" }
  | { state: "success" }
  | { state: "error"; message: string };

const field = "flex flex-col gap-2";
const label = "label text-cyan";
const input =
  "min-h-11 w-full rounded-ctl border border-rim-strong bg-ink px-3 py-2.5 text-base text-text transition-colors duration-150 placeholder:text-subtle focus-visible:border-cyan read-only:cursor-wait";

/** POST to /api/contact; resolves to an error message, or null on success. */
async function send(body: {
  name: string;
  email: string;
  message: string;
}): Promise<string | null> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return null;
    const data: unknown = await res.json().catch(() => null);
    const error =
      data && typeof data === "object" && "error" in data
        ? String(data.error)
        : null;
    return error ?? "Something went wrong.";
  } catch {
    return "Network error.";
  }
}

/**
 * The contact form: visible labels, 44px inputs at 16px, and one polite live
 * region that announces pending, success, and error. Controls are never
 * disabled mid-send (that would drop keyboard focus); the fields go read-only
 * and the button aria-disabled instead. Input is cleared only on success.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const pending = status.state === "pending";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (pending) return;
    setStatus({ state: "pending" });

    const error = await send({ name, email, message });
    if (error) {
      setStatus({ state: "error", message: error });
      return;
    }
    setStatus({ state: "success" });
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={pending}
      className="js-only flex flex-col gap-5"
    >
      <div className={field}>
        <label htmlFor="contact-name" className={label}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          readOnly={pending}
          className={input}
        />
      </div>

      <div className={field}>
        <label htmlFor="contact-email" className={label}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          readOnly={pending}
          className={input}
        />
      </div>

      <div className={field}>
        <label htmlFor="contact-message" className={label}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          rows={6}
          required
          readOnly={pending}
          className={twMerge(input, "min-h-36 resize-y")}
        />
      </div>

      <div className="flex flex-col items-start">
        <button
          type="submit"
          aria-disabled={pending}
          className={twMerge(buttonPrimary, "aria-disabled:cursor-wait")}
        >
          {pending ? "Sending…" : "Send message"}
        </button>

        <div role="status" aria-live="polite">
          {status.state === "pending" && (
            <p className="mt-4 text-[15px] text-muted">Sending your message…</p>
          )}
          {status.state === "success" && (
            <p className="mt-4 border-l-2 border-cyan pl-3 text-[15px] leading-[1.6]">
              <span className="font-semibold text-cyan">Message sent.</span> Got
              it — I'll get back to you soon.
            </p>
          )}
          {status.state === "error" && (
            <p className="mt-4 border-l-2 border-red pl-3 text-[15px] leading-[1.6]">
              <span className="font-semibold text-red">
                Couldn't send: {status.message}
              </span>{" "}
              Your message is still here, so you can try again.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
