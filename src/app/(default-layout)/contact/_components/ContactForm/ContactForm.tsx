"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { buttonPrimary } from "@/lib/buttonClasses";

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
      // A stalled send must not lock the (read-only) form forever.
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) return null;
    const data: unknown = await res.json().catch(() => null);
    const error =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string" &&
      data.error
        ? data.error
        : null;
    return error ?? "Something went wrong.";
  } catch (error) {
    return error instanceof DOMException && error.name === "TimeoutError"
      ? "The server took too long to answer."
      : "Network error.";
  }
}

/**
 * The contact form: visible labels, 44px inputs at 16px, and one polite
 * status region that announces the outcome (the button itself says
 * "Sending…" meanwhile). Controls are never disabled mid-send (that would
 * drop keyboard focus); the fields go read-only and the button aria-disabled
 * instead. Input is cleared only on success. Without JavaScript it is a plain
 * form post to the same endpoint, which redirects to /contact/sent or
 * /contact/failed.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const pending = status.state === "pending";
  // Guards double submits within one render, before `pending` is visible.
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  // Keep the outcome visible above the docked player without moving focus
  // off the submit button.
  useEffect(() => {
    if (status.state === "success" || status.state === "error") {
      statusRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [status.state]);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    e.currentTarget.setCustomValidity("");
    setValues((v) => ({ ...v, [name]: value }));
    // A new message makes the last "sent" confirmation stale.
    if (status.state === "success") setStatus({ state: "idle" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;

    // `required` accepts whitespace; treat it as empty, with the same native
    // bubble on the first offending field.
    for (const el of e.currentTarget.querySelectorAll<
      HTMLInputElement | HTMLTextAreaElement
    >("input, textarea")) {
      if (!el.value.trim()) {
        el.setCustomValidity("Please fill out this field.");
        el.reportValidity();
        return;
      }
    }

    inFlight.current = true;
    setStatus({ state: "pending" });
    const error = await send(values);
    inFlight.current = false;
    if (error) {
      setStatus({ state: "error", message: error });
      return;
    }
    setStatus({ state: "success" });
    setValues({ name: "", email: "", message: "" });
  }

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <p className="text-[15px] text-muted">All fields are required.</p>

      <div className={field}>
        <label htmlFor="contact-name" className={label}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
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
          value={values.email}
          onChange={onChange}
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
          value={values.message}
          onChange={onChange}
          // Chromium scrolls a textarea's caret into view, not its box, so the
          // dock scroll-margin is ignored; bring the whole field up instead.
          onFocus={(e) => e.currentTarget.scrollIntoView({ block: "nearest" })}
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

        <div ref={statusRef} id="contact-status" role="status">
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
