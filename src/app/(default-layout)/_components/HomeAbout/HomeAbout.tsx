import Link from "next/link";
import { CtaLinks } from "@/components/CtaLinks/CtaLinks";
import { Portrait } from "@/components/Portrait/Portrait";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { profile } from "@/data/resume";

/** Home §01: positioning in the profile's words, portrait, and the CTAs. */
export function HomeAbout() {
  return (
    <section aria-labelledby="about">
      <SectionHeader index="01" title="about" id="about" />
      <div className="grid items-start gap-6 min-[720px]:grid-cols-[1fr_240px] min-[720px]:gap-10">
        <div>
          {/* PLACEHOLDER: these two paragraphs follow the profile README, which
              marks its own about text as a placeholder. Owner to confirm. */}
          <p className="measure-60 text-lg leading-[1.55] min-[720px]:text-xl">
            I'm {profile.firstName} {profile.lastName}, a staff-level engineer
            and architect in Kansas City. These days I'm all-in on{" "}
            <strong className="font-semibold text-pink-ink">
              AI and the agentic SDLC
            </strong>
            : orchestrating coding agents like Claude Code and Codex across the
            whole lifecycle, from planning and implementation to review, with
            the worktrees, hooks, and guardrails that keep them honest.
          </p>
          <p className="mt-[18px] measure-65 text-[17px] leading-[1.7]">
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
          <CtaLinks className="mt-7" />
        </div>

        <Portrait />
      </div>
    </section>
  );
}
