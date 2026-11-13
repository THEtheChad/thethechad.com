/** First tab stop on every page; jumps past the header to <main id="main">. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="label fixed top-2 left-2 z-50 inline-flex min-h-11 -translate-y-[200%] items-center rounded-ctl bg-pink px-4 text-on-accent focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
