"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "min-h-11 w-full rounded-ctl border border-rim-strong bg-ink px-3 py-2.5 text-base text-text placeholder:text-subtle transition-colors duration-150 focus-visible:border-cyan disabled:opacity-60";

const labelClass = "label text-cyan";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <>
      <SectionHeader as="h1" index="05" title="contact" />
      <div className="max-w-xl">
        {status === "success" ? (
          <div role="status" className="rounded-plate border-2 border-rim p-6">
            <p className="label text-cyan">Message sent</p>
            <p className="mt-3 text-muted">
              Got it — I&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 inline-flex min-h-11 items-center rounded-ctl border border-rim-strong px-5 font-mono text-[13px] tracking-[0.12em] text-text uppercase transition-colors duration-150 hover:bg-raise"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name-input" className={labelClass}>
                name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={status === "sending"}
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email-input" className={labelClass}>
                email
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                disabled={status === "sending"}
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message-input" className={labelClass}>
                message
              </label>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What's on your mind?"
                rows={6}
                required
                disabled={status === "sending"}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <p role="alert" className="font-mono text-[13px] text-red">
                {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 items-center self-start rounded-ctl border border-pink bg-pink px-5 font-mono text-[13px] font-medium tracking-[0.12em] text-on-accent uppercase transition-opacity duration-150 hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
