import type { Metadata } from "next";
import { LinerNotes } from "@/components/LinerNotes/LinerNotes";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { SkylineHero } from "@/components/SkylineHero/SkylineHero";
import { pageMetadata } from "@/lib/pageMetadata";
import { HomeAbout } from "./_components/HomeAbout/HomeAbout";
import { HomeLately } from "./_components/HomeLately/HomeLately";
import { HomeNowPlaying } from "./_components/HomeNowPlaying/HomeNowPlaying";

export const metadata: Metadata = pageMetadata({
  description:
    "Chad Elliott, a staff-level engineer in Kansas City: all-in on AI and the agentic SDLC, still TypeScript, React, and Next.js underneath, and microcontrollers away from the browser.",
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* The hero artwork carries the name visually; this is its heading. */}
      <h1 className="sr-only">THEtheChad: Chad Elliott</h1>
      <SkylineHero />
      <HomeAbout />
      <section aria-labelledby="the-stack">
        <SectionHeader index="02" title="the stack" id="the-stack" />
        <LinerNotes />
      </section>
      <HomeNowPlaying />
      <HomeLately />
    </>
  );
}
