import type { Metadata } from "next";
import { ContactResult } from "../_components/ContactResult/ContactResult";

export const metadata: Metadata = {
  title: "Message not sent · Chad Elliott",
  robots: { index: false },
};

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
