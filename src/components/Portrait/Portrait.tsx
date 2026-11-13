import Image from "next/image";
import { profile } from "@/data/resume";

/** Roles from the résumé headline and the site's own sections. */
const roles = [
  "Software architect",
  "Staff engineer",
  "Photographer",
  "Builder of things",
];

export interface PortraitProps {
  className?: string;
}

/**
 * The portrait card: photo in a 2px rim frame with a mono name caption, and
 * the roles as a small mono list below it. The figure is `.theme-dark`: the
 * caption sits on the photo, so it stays dark in both themes.
 */
export function Portrait({ className }: PortraitProps) {
  return (
    <div className={className}>
      <figure className="theme-dark relative max-w-[200px] overflow-hidden rounded-plate border-2 border-rim min-[720px]:max-w-none">
        <Image
          src="/thethechad.jpeg"
          alt="Chad Elliott, smiling, in a plaid shirt"
          width={566}
          height={639}
          sizes="(min-width: 720px) 240px, 200px"
          className="block h-auto w-full"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink from-55% to-transparent px-3 pt-7 pb-2.5 font-mono text-xs tracking-[0.2em] text-text uppercase">
          {profile.firstName} {profile.lastName}
        </figcaption>
      </figure>
      <ul className="mt-3.5 font-mono text-[13px] leading-[1.7] text-muted">
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </div>
  );
}
