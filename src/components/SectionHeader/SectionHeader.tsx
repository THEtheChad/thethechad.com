export interface SectionHeaderProps {
  title: string;
  slotProps?: {
    root?: React.HTMLProps<HTMLDivElement>;
  };
}

export function SectionHeader({ title, slotProps }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-4" {...slotProps?.root}>
      {/** biome-ignore lint/suspicious/noCommentText: intentional retro aesthetic */}
      <span className="font-pixel text-[9px] text-pink">//</span>
      <h1 className="font-retro text-4xl text-body uppercase">{title}</h1>
      <div
        className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent"
        style={{ boxShadow: "0 0 6px rgba(0,207,255,0.2)" }}
      />
    </div>
  );
}
