import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { TypingTitle } from "@/components/TypingTitle/TypingTitle";

const titles = [
  "Chad!",
  "a photographer.",
  "a solutions architect.",
  "a software engineer.",
  "a builder of things.",
];

export default function About() {
  return (
    <div>
      <SectionHeader title="About" />
      {/* Name / typing title */}
      <div>
        <div className="font-retro text-5xl leading-none text-body">
          Hey there, I&apos;m <TypingTitle titles={titles} />
        </div>
        <p className="my-8">
          I vividly recall the first computer I ever owned. It was a VTech
          PreComputer 1000 with a 1 line LCD screen that my parents bought me
          when I was 8 or 9. The first thing I did when I got it was open up the
          instruction manual and start teaching myself BASIC.
        </p>

        <p className="my-8">
          To this day, I approach every project, business, and relationship with
          that same focused, thoughtful fervor. I'm always exploring new
          opportunities and testing my limits, learning as I go and expanding my
          knowledge and skills to keep pace with the rapid rate at which my
          ambitions rise.
        </p>

        <p className="my-8">I've worn many hats throughout the years.</p>

        <p className="my-8">
          I worked as a Social Media Strategist for Zaarly when they were just
          cutting their teeth. I helped expand their operations into Los Angeles
          and San Francisco by targeting key influencers and engaging with them
          via Twitter and Facebook.
        </p>

        <p className="my-8">
          I jumped in to IT as a Store Technician for Sunshine Energy. While
          there, I cobbled together a program for remotely administrating and
          updating their store computers by augmenting their POS system (PDI),
          saving the company time and money by reducing the need for them to
          send a tech out to the store. I eventually earned a position as
          Assistant IT Director.
        </p>

        <p className="my-8">
          I flexed my programming prowess as an Interactive Web Developer for
          VML. I worked alongside some of their best and brightest developing a
          Facebook application for Gatorade. While there, I also carried the
          torch as organizer and speaker for Afternoon Tea, a developer's group
          aimed at raising the bar for front-end standards at VML.
        </p>

        <p className="my-8">
          If you're interested in me, what I do, or simply want to connect,
          please, contact me! I'm highly engaged in the tech and entrepreneurial
          communities in Kansas City and am always looking to expand my network.
          I also really enjoy helping people, so if you need something, let me
          know!
        </p>
      </div>
    </div>
  );
}
