import type { Metadata } from "next";
import { ContactResult } from "../_components/ContactResult/ContactResult";

export const metadata: Metadata = {
  title: "Message sent · Chad Elliott",
  robots: { index: false },
};

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
