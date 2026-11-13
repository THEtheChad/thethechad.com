import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";
import { ContactResult } from "../_components/ContactResult/ContactResult";

export const metadata: Metadata = pageMetadata({
  title: "Message not sent",
  description: "Your message to Chad Elliott could not be sent.",
  path: "/contact/failed",
  noindex: true,
});

export default function ContactFailed() {
  return (
    <ContactResult tone="error">
      <p>
        <strong className="font-semibold text-red">
          Your message couldn't be sent.
        </strong>{" "}
        Every field is required. Please go back and try again, or reach me on
        GitHub or LinkedIn from the links below.
      </p>
    </ContactResult>
  );
}
