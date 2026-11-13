import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";
import { ContactResult } from "../_components/ContactResult/ContactResult";

export const metadata: Metadata = pageMetadata({
  title: "Message sent",
  description: "Your message to Chad Elliott was sent.",
  path: "/contact/sent",
  noindex: true,
});

export default function ContactSent() {
  return (
    <ContactResult tone="success">
      <p>
        <strong className="font-semibold text-cyan">Message sent.</strong> Got
        it — I'll get back to you soon.
      </p>
    </ContactResult>
  );
}
