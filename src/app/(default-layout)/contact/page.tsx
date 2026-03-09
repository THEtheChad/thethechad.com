"use client";

import { Section } from "@/components/Section/Section";
import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full bg-[#04040E] border border-line px-3 py-2 font-retro text-lg text-body placeholder-soft/40 outline-none transition-colors focus:border-accent-soft focus:shadow-[0_0_8px_rgba(0,207,255,0.2)]";

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
    <Section title="Contact">
      <div className="max-w-xl">
        {status === "success" ? (
          <div className="border border-accent-soft/30 bg-[#04040E] p-6">
            <p className="font-pixel text-[9px] text-accent-soft">
              <span className="text-pink">❯ </span>
              MESSAGE SENT
            </p>
            <p className="mt-3 font-retro text-lg text-soft">
              Got it — I&apos;ll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-4 flex items-center gap-2 font-retro text-lg text-soft transition-colors hover:text-accent-soft"
            >
              <span className="text-pink">$</span>
              <span>send another</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-pixel text-[9px] text-soft">
                <span className="text-pink">$</span> name
              </label>
              <input
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
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-pixel text-[9px] text-soft">
                <span className="text-pink">$</span> email
              </label>
              <input
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
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-1.5 font-pixel text-[9px] text-soft">
                <span className="text-pink">$</span> message
              </label>
              <textarea
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
              <p className="font-pixel text-[8px] text-pink">
                ✗ {errorMsg}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="self-start border border-accent/60 px-4 py-2 font-pixel text-[9px] text-accent-soft transition-colors hover:border-accent-soft hover:bg-accent/10 disabled:opacity-50"
              style={
                status === "sending"
                  ? {}
                  : { boxShadow: "0 0 8px rgba(0,207,255,0.15)" }
              }
            >
              {status === "sending" ? "SENDING..." : "$ send --message"}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
