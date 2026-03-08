import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import { positions } from "@/data/resume";

export default function Employment() {
  return (
    <>
      <SectionHeader title="Employment" />

      <div className="flex flex-col gap-4">
        {positions.map((pos) => (
          <div
            key={pos.title}
            className="group corner-frame border border-line bg-card p-5 transition-colors hover:border-accent/50 hover:bg-card/80"
          >
            <h3 className="mb-3 font-pixel text-[11px] text-body transition-colors group-hover:text-accent-soft">
              {pos.title}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-soft">
              {pos.description}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="border border-line bg-badge px-2.5 py-0.5 font-pixel text-[8px] text-accent-soft">
                {pos.company}
              </span>
              <span className="border border-line bg-badge px-2.5 py-0.5 font-pixel text-[8px] text-accent-soft">
                {pos.location}
              </span>
              <span className="border border-line bg-badge px-2.5 py-0.5 font-pixel text-[8px] text-pink">
                {pos.startDate} — {pos.endDate ?? "PRESENT"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
