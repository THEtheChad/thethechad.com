import type { Metadata } from "next";
import { CtaLinks } from "@/components/CtaLinks/CtaLinks";
import { Plate } from "@/components/Plate/Plate";
import { Portrait } from "@/components/Portrait/Portrait";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { type Track, TrackList } from "@/components/TrackList/TrackList";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Chad Elliott, from a VTech PreComputer 1000 and a BASIC manual to many hats: social media strategist, IT, interactive web developer, and staff engineer.",
  path: "/about",
});

/**
 * Earlier roles, from the about page's own copy (no dates exist for these).
 * Sentences are trimmed of the repeated
 * "I worked as … for …" lead-in, which the track title now carries.
 */
const hats: readonly Track[] = [
  {
    title: (
      <>
        Social Media Strategist{" "}
        <span className="text-pink-ink">
          <span aria-hidden="true">· </span>
          <span className="sr-only">at </span>Zaarly
        </span>
      </>
    ),
    detail:
      "Joined when they were just cutting their teeth. I helped expand their operations into Los Angeles and San Francisco by targeting key influencers and engaging with them via Twitter and Facebook.",
  },
  {
    title: (
      <>
        Store Technician → Assistant IT Director{" "}
        <span className="text-pink-ink">
          <span aria-hidden="true">· </span>
          <span className="sr-only">at </span>Sunshine Energy
        </span>
      </>
    ),
    detail:
      "I jumped in to IT as a Store Technician and cobbled together a program for remotely administrating and updating their store computers by augmenting their POS system (PDI), saving the company time and money by reducing the need to send a tech out to the store. I eventually earned a position as Assistant IT Director.",
  },
  {
    title: (
      <>
        Interactive Web Developer{" "}
        <span className="text-pink-ink">
          <span aria-hidden="true">· </span>
          <span className="sr-only">at </span>VML
        </span>
      </>
    ),
    detail:
      "I flexed my programming prowess alongside some of their best and brightest, developing a Facebook application for Gatorade. I also carried the torch as organizer and speaker for Afternoon Tea, a developer's group aimed at raising the bar for front-end standards at VML.",
  },
];

const prose = "measure-65 text-[17px] leading-[1.7]";

export default function About() {
  return (
    <>
      <SectionHeader as="h1" index="01" title="about" />

      <div className="grid items-start gap-8 min-[720px]:grid-cols-[1fr_240px] min-[720px]:gap-10">
        <div className="flex flex-col gap-[1.1em]">
          <p className="measure-60 text-lg leading-[1.55] min-[720px]:text-xl">
            I vividly recall the first computer I ever owned. It was a VTech
            PreComputer 1000 with a 1 line LCD screen that my parents bought me
            when I was 8 or 9. The first thing I did when I got it was open up
            the instruction manual and start teaching myself BASIC.
          </p>
          <p className={prose}>
            To this day, I approach every project, business, and relationship
            with that same focused, thoughtful fervor. I'm always exploring new
            opportunities and testing my limits, learning as I go and expanding
            my knowledge and skills to keep pace with the rapid rate at which my
            ambitions rise.
          </p>
        </div>
        <Portrait />
      </div>

      <section aria-labelledby="many-hats" className="mt-12">
        <Plate tone="page">
          <h2
            id="many-hats"
            className="label mb-3.5 border-b border-rim pb-2.5 font-normal text-cyan"
          >
            I've worn many hats throughout the years
          </h2>
          <TrackList tracks={hats} className="flex flex-col gap-3" />
        </Plate>
      </section>

      <div className="mt-12 flex flex-col gap-7">
        <p className={prose}>
          If you're interested in me, what I do, or simply want to connect,
          please, contact me! I'm highly engaged in the tech and entrepreneurial
          communities in Kansas City and am always looking to expand my network.
          I also really enjoy helping people, so if you need something, let me
          know!
        </p>
        <CtaLinks />
      </div>
    </>
  );
}
