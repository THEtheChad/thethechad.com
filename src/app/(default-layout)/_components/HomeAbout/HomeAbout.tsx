import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { profile } from "@/data/resume";

const button =
  "inline-flex h-11 items-center gap-2 rounded-ctl border px-5 font-mono text-[13px] tracking-[0.12em] uppercase transition-colors duration-150";
const primary = `${button} border-pink bg-pink font-medium text-on-accent hover:bg-pink-ink hover:border-pink-ink`;
const secondary = `${button} border-rim-strong text-text hover:bg-raise`;

/** Roles from the résumé headline and the site's own sections. */
const roles = [
  "Software architect",
  "Staff engineer",
  "Photographer",
  "Builder of things",
];

/** Home §01: positioning in the profile's words, portrait, and the CTAs. */
export function HomeAbout() {
  return (
    <section aria-labelledby="about">
      <SectionHeader index="01" title="about" id="about" />
      <div className="grid items-start gap-6 min-[720px]:grid-cols-[1fr_240px] min-[720px]:gap-10">
        <div>
          {/* PLACEHOLDER: these two paragraphs follow the profile README, which
              marks its own about text as a placeholder. Owner to confirm. */}
          <p className="max-w-[60ch] text-lg leading-[1.55] min-[720px]:text-xl">
            I'm {profile.firstName} {profile.lastName}, a staff-level engineer
            and architect in Kansas City. These days I'm all-in on{" "}
            <strong className="font-semibold text-pink-ink">
              AI and the agentic SDLC
            </strong>
            : orchestrating coding agents like Claude Code and Codex across the
            whole lifecycle, from planning and implementation to review, with
            the worktrees, hooks, and guardrails that keep them honest.
          </p>
          <p className="mt-[18px] max-w-[65ch] text-[17px] leading-[1.7]">
            Underneath that it's still TypeScript, React, and Next.js, and away
            from the browser I tinker with microcontrollers (Arduino, ESP,
            STM32) and anything with a serial port. It started with a VTech
            PreComputer 1000 and a BASIC manual.{" "}
            <Link
              href="/about"
              className="text-cyan underline decoration-1 underline-offset-4 hover:decoration-2"
            >
              The long version
            </Link>
            .
          </p>
          <ul className="mt-7 flex flex-wrap gap-3">
            <li>
              <Link href="/contact" className={primary}>
                Say hello <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondary}
              >
                <span aria-hidden="true">↓</span> Résumé.pdf
              </a>
            </li>
            <li>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondary}
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <figure className="relative max-w-[200px] overflow-hidden rounded-plate border-2 border-rim min-[720px]:max-w-none">
            <Image
              src="/thethechad.jpeg"
              alt="Chad Elliott, smiling, in a plaid shirt"
              width={566}
              height={639}
              sizes="(min-width: 720px) 240px, 200px"
              className="block h-auto w-full"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#07060d] from-55% to-transparent px-3 pt-7 pb-2.5 font-mono text-xs tracking-[0.2em] text-[#f3e9ff] uppercase">
              {profile.firstName} {profile.lastName}
            </figcaption>
          </figure>
          <ul className="mt-3.5 font-mono text-[13px] leading-[1.7] text-muted max-[720px]:hidden">
            {roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
