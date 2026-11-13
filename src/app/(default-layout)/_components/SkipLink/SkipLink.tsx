/** First tab stop on every page; jumps past the header to <main id="main">. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="label fixed top-2 left-2 z-50 -translate-y-[200%] rounded-ctl bg-pink px-4 py-3 text-on-accent focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
