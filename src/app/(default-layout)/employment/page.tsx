import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { positions, profile } from "@/data/resume";
import { buttonSecondary } from "@/lib/buttonClasses";
import { pageMetadata } from "@/lib/pageMetadata";
import { RESUME_REQUEST_HREF } from "@/lib/routes";
import { Position } from "./_components/Position/Position";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Chad Elliott's work history: solutions architect, software engineer, and marketing automation strategist in Kansas City, with the technologies behind each role.",
  path: "/employment",
});

/** The summary's opening paragraph is the page's lead. */
const lead = profile.summary.split("\n\n")[0];

export default function Employment() {
  return (
    <>
      <SectionHeader as="h1" index="02" title="work" />
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-4 gap-y-5">
        <p className="measure-52 text-lg leading-[1.55] min-[720px]:text-xl">
          {lead}
        </p>
        <Link href={RESUME_REQUEST_HREF} className={buttonSecondary}>
          Request résumé
        </Link>
      </div>
      <div>
        {positions.map((position) => (
          <Position
            key={`${position.company}-${position.title}`}
            position={position}
          />
        ))}
      </div>
    </>
  );
}
