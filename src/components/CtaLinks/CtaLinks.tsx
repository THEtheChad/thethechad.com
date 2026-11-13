import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { NewTabNote } from "@/components/NewTabNote/NewTabNote";
import { profile } from "@/data/resume";
import { buttonPrimary, buttonSecondary } from "@/lib/buttonClasses";
import { RESUME_REQUEST_HREF } from "@/lib/routes";

export interface CtaLinksProps {
  className?: string;
}

/** The three calls to action: contact (primary), résumé request, GitHub. */
export function CtaLinks({ className }: CtaLinksProps) {
  return (
    <ul className={twMerge("flex flex-wrap gap-3", className)}>
      <li>
        <Link href="/contact" className={buttonPrimary}>
          Say hello <span aria-hidden="true">→</span>
        </Link>
      </li>
      <li>
        <Link href={RESUME_REQUEST_HREF} className={buttonSecondary}>
          Request résumé
        </Link>
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
