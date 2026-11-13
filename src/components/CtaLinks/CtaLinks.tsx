import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { NewTabNote } from "@/components/NewTabNote/NewTabNote";
import { profile } from "@/data/resume";
import { buttonPrimary, buttonSecondary } from "@/lib/buttonClasses";

export interface CtaLinksProps {
  className?: string;
}

/** The three calls to action: contact (primary), résumé, and GitHub. */
export function CtaLinks({ className }: CtaLinksProps) {
  return (
    <ul className={twMerge("flex flex-wrap gap-3", className)}>
      <li>
        <Link href="/contact" className={buttonPrimary}>
          Say hello <span aria-hidden="true">→</span>
        </Link>
      </li>
      <li>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonSecondary}
        >
          <span aria-hidden="true">↓</span> Résumé.pdf
          <NewTabNote />
        </a>
      </li>
      <li>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonSecondary}
        >
          GitHub <span aria-hidden="true">↗</span>
          <NewTabNote />
        </a>
      </li>
    </ul>
  );
}
