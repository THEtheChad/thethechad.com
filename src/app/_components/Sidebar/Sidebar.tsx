"use client";

import Image from "next/image";
import { HTMLProps } from "react";
import { profile } from "@/data/resume";
import { TypingTitle } from "@/components/TypingTitle/TypingTitle";
import { GithubIcon, LinkedinIcon } from "@/components/PixelIcons/PixelIcons";
import { PixelGlitch } from "@/components/PixelGlitch/PixelGlitch";

const titles = [
  "Chad!",
  "a photographer.",
  "a solutions architect.",
  "a software engineer.",
  "a builder of things.",
];

export type SidebarProps = HTMLProps<HTMLElement>;

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col gap-6 p-6 bg-[#08081A] border border-line/60 ${className ?? ""}`}
      style={{ boxShadow: "0 0 24px rgba(0,95,255,0.08)" }}
      {...props}
    >
      {/* Photo */}
      <div className="corner-frame relative overflow-hidden border border-line/60 bg-badge">
        <Image
          src="/thethechad.jpeg"
          width={566}
          height={639}
          alt="Chad"
          className="w-full object-cover"
        />
        <PixelGlitch src="/thethechad.jpeg" />
      </div>

      {/* Neon divider */}
      <div className="flex items-center gap-2">
        <div
          className="h-px flex-1 bg-accent/30"
          style={{ boxShadow: "0 0 6px rgba(0,207,255,0.2)" }}
        />
        <span className="font-pixel text-[7px] text-accent-soft/30">◆</span>
      </div>

      {/* Headline */}
      <p className="font-pixel text-[9px] leading-relaxed text-accent-soft">
        {profile.headline}
      </p>

      {/* Social links with 8-bit icons */}
      <div className="flex items-center gap-4 pt-2">
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-soft transition-colors hover:text-accent-soft"
          title="GitHub"
        >
          <GithubIcon size={22} />
        </a>
        <a
          href={profile.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-soft transition-colors hover:text-accent-soft"
          title="LinkedIn"
        >
          <LinkedinIcon size={22} />
        </a>
      </div>
    </aside>
  );
}
