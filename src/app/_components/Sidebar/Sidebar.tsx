"use client";

import Image from "next/image";
import { HTMLProps } from "react";
import { profile } from "@/data/resume";
import { TypingTitle } from "@/components/TypingTitle/TypingTitle";
import { PixelGlitch } from "@/components/PixelGlitch/PixelGlitch";

const titles = [
  "Photographer",
  "Solutions Architect",
  "Software Engineer",
  "Builder of Things",
];

export type SidebarProps = HTMLProps<HTMLElement>;

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col border border-line/60 overflow-hidden ${className ?? ""}`}
      style={{ boxShadow: "0 0 24px rgba(0,95,255,0.08)" }}
      {...props}
    >
      {/* Terminal body */}
      <div className="flex flex-col bg-[#04040E] font-retro text-lg flex-1 overflow-y-auto">
        {/* display portrait */}
        <div className="border-b border-line/20 px-4 pt-3 pb-0">
          <div className="relative overflow-hidden">
            <Image
              src="/thethechad.jpeg"
              width={566}
              height={639}
              alt="Chad"
              className="w-full object-cover"
            />
            <PixelGlitch src="/thethechad.jpeg" />
          </div>
        </div>

        {/* Typing title prompt */}
        <div className="border-b border-line/20 px-4 py-3">
          <span className="text-pink">❯ </span>
          <TypingTitle titles={titles} />
        </div>

        {/* Social links */}
        <div className="flex flex-col gap-1 border-b border-line/20 px-4 py-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-soft transition-colors hover:text-accent-soft"
          >
            <span className="text-pink">$</span>
            <span>open github</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-soft transition-colors hover:text-accent-soft"
          >
            <span className="text-pink">$</span>
            <span>open linkedin</span>
          </a>
        </div>

        {/* Action commands */}
        <div className="flex flex-col gap-1 px-4 py-3">
          <a
            href={profile.resumeUrl}
            download
            className="flex items-center gap-2 text-soft transition-colors hover:text-accent-soft"
          >
            <span className="text-pink">$</span>
            <span>download resume.pdf</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 text-soft transition-colors hover:text-accent-soft"
          >
            <span className="text-pink">$</span>
            <span>mail --to chad</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
