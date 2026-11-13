import Markdown from "react-markdown";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { positions } from "@/data/resume";

export default function Employment() {
  return (
    <>
      <SectionHeader as="h1" index="02" title="work" />
      <div className="flex flex-col gap-12">
        {positions.map((pos) => (
          <article key={`${pos.company}-${pos.title}`}>
            <h2 className="text-[21px] leading-tight font-semibold tracking-[-0.01em] min-[720px]:text-2xl">
              {pos.title}{" "}
              <span className="font-medium text-pink-ink">· {pos.company}</span>
            </h2>
            <p className="mt-1.5 font-mono text-xs tracking-[0.12em] text-muted uppercase">
              <span className="text-warm">
                {pos.startDate} — {pos.endDate ?? "Present"}
              </span>
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {pos.location}
            </p>
            <div className="mt-4 max-w-[65ch] text-base leading-[1.65] [&_li]:mt-2 [&_li]:pl-1 [&_p+p]:mt-4 [&_p+ul]:mt-3 [&_ul]:list-['—__'] [&_ul]:pl-6 [&_ul]:marker:text-cyan">
              <Markdown>{pos.description}</Markdown>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
