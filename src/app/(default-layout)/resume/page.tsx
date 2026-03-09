import { profile, positions, education, skills } from "@/data/resume";

export const metadata = {
  title: `${profile.firstName} — Resume`,
};

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      {/** biome-ignore lint/suspicious/noCommentText: intentional retro aesthetic */}
      <span className="font-pixel text-[9px] text-pink">//</span>
      <h2 className="font-retro text-4xl text-body">{label}</h2>
      <div
        className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent"
        style={{ boxShadow: "0 0 6px rgba(0,207,255,0.2)" }}
      />
    </div>
  );
}

export default function Resume() {
  return (
    <>
      {/* Profile Header */}
      <section className="corner-frame mb-10 border border-line bg-card p-8 neon-box">
        <div className="flex h-16 w-16 items-center justify-center border border-line bg-badge font-retro text-2xl text-accent-soft">
          {profile.firstName[0]}
        </div>
        <h1 className="glitch-text mt-4 font-retro text-5xl text-body">
          {profile.firstName} {profile.lastName}
          <span className="blink-cursor text-accent-soft">_</span>
        </h1>
        <p className="mt-2 font-pixel text-[11px] text-accent-soft">
          {profile.headline}
        </p>
        <p className="mt-1 font-pixel text-[9px] text-soft">
          {profile.location}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-soft">
          {profile.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="font-pixel text-[9px] text-accent-soft hover:underline"
          >
            {profile.email}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[9px] text-accent-soft hover:underline"
          >
            LINKEDIN
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[9px] text-accent-soft hover:underline"
          >
            GITHUB
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <SectionHeader label="EXPERIENCE" />
        <div className="space-y-3">
          {positions.map((pos) => (
            <div
              key={pos.title}
              className="corner-frame border border-line bg-card p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-pixel text-[11px] text-body">
                    {pos.title}
                  </h3>
                  <p className="mt-1 font-pixel text-[9px] text-accent-soft">
                    {pos.company}
                  </p>
                  <p className="font-pixel text-[8px] text-soft">
                    {pos.location}
                  </p>
                </div>
                <p className="shrink-0 font-pixel text-[8px] text-pink">
                  {pos.startDate} — {pos.endDate ?? "PRESENT"}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                {pos.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-10">
        <SectionHeader label="EDUCATION" />
        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="corner-frame border border-line bg-card p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-pixel text-[11px] text-body">
                    {edu.school}
                  </h3>
                  <p className="mt-1 font-pixel text-[9px] text-accent-soft">
                    {edu.degree} · {edu.fieldOfStudy}
                  </p>
                  {edu.activities && (
                    <p className="font-pixel text-[8px] text-soft">
                      {edu.activities}
                    </p>
                  )}
                </div>
                <p className="shrink-0 font-pixel text-[8px] text-pink">
                  {edu.startYear} — {edu.endYear ?? "PRESENT"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <SectionHeader label="SKILLS" />
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="corner-frame border border-line bg-card px-4 py-2 font-pixel text-[9px] text-accent-soft transition-colors hover:border-accent-soft hover:text-body"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
