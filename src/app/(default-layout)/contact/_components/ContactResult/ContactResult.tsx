import Link from "next/link";
import type { ReactNode } from "react";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { buttonSecondary } from "@/lib/buttonClasses";

export interface ContactResultProps {
  tone: "success" | "error";
  children: ReactNode;
}

/**
 * Where the no-JavaScript contact form lands after posting (the enhanced
 * form shows the same outcome inline instead).
 */
export function ContactResult({ tone, children }: ContactResultProps) {
  return (
    <>
      <SectionHeader as="h1" index="05" title="contact" />
      <div
        className={`measure-60 border-l-2 pl-4 text-lg leading-[1.6] ${
          tone === "success" ? "border-cyan" : "border-red"
        }`}
      >
        {children}
      </div>
      <p className="mt-8">
        <Link href="/contact" className={buttonSecondary}>
          <span aria-hidden="true">←</span> Back to contact
        </Link>
      </p>
    </>
  );
}
