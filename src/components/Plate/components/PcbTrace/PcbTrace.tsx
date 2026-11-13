/**
 * The two circuit-board traces from the foot of liner-notes.svg, drawn in the
 * rim color. Decorative.
 */
export function PcbTrace() {
  return (
    <svg
      viewBox="0 0 240 32"
      className="h-auto w-[150px] shrink-0 fill-none stroke-rim stroke-2 min-[720px]:w-[240px]"
      aria-hidden="true"
      focusable="false"
    >
      <g strokeLinecap="round">
        <path d="M2 20H98L110 8H198" />
        <path d="M2 28H128L140 16H232" />
      </g>
      <g className="fill-night">
        <circle cx="198" cy="8" r="4" />
        <circle cx="232" cy="16" r="4" />
      </g>
    </svg>
  );
}
