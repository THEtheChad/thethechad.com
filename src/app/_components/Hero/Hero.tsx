import Image from "next/image";
import Link from "next/link";
import { profile } from "@/data/resume";
import { TypingTitle } from "@/components/TypingTitle/TypingTitle";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export type HeroProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const titles = [
  "Chad!",
  "a photographer.",
  "a solutions architect.",
  "a software engineer.",
  "a builder of things.",
];

export function Hero(props: HeroProps) {
  return (
    <section {...props}>
      {/* System label */}

      <p className="mb-4 font-pixel text-[9px] text-pink">
        {/** biome-ignore lint/suspicious/noCommentText: this is intentional syntax for the retro aesthetic */}
        // INITIALIZING USER PROFILE
      </p>

      {/* Avatar */}
      <div className="corner-frame mb-6 inline-flex h-20 w-20 items-center justify-center border border-line bg-badge">
        <Image
          src="/thethechad.jpeg"
          width={639}
          height={566}
          alt="Picture of the author"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name */}
      <h1 className="mb-2 font-retro text-7xl leading-none text-body">
        Hey, I&apos;m <TypingTitle titles={titles} />
      </h1>

      <p className="mb-4 font-pixel text-[11px] tracking-wide text-accent-soft">
        {profile.headline}
      </p>

      {/* Neon divider */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="h-px flex-1 bg-accent/40"
          style={{ boxShadow: "0 0 6px rgba(0,207,255,0.4)" }}
        />
        <span className="font-pixel text-[8px] text-accent-soft/50">◆</span>
        <div className="h-px w-12 bg-accent/20" />
      </div>

      <p className="max-w-2xl text-lg leading-relaxed text-soft">
        {profile.summary}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/resume"
          className="neon-box border border-accent bg-accent/10 px-6 py-2 font-pixel text-[10px] text-accent-soft transition-colors hover:bg-accent/20 hover:text-body"
        >
          VIEW RESUME
        </Link>
        <Link
          href="/photography"
          className="border border-line px-6 py-2 font-pixel text-[10px] text-soft transition-colors hover:border-accent-soft hover:text-body"
        >
          PHOTOGRAPHY
        </Link>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-line px-6 py-2 font-pixel text-[10px] text-soft transition-colors hover:border-accent-soft hover:text-body"
        >
          GITHUB
        </a>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-line px-6 py-2 font-pixel text-[10px] text-soft transition-colors hover:border-accent-soft hover:text-body"
        >
          LINKEDIN
        </a>
      </div>
    </section>
  );
}
