import Link from "next/link";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-card/20 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="glitch-text neon-text font-pixel text-sm text-accent-soft transition-colors hover:text-body"
        >
          thethechad
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/photography"
            className="border border-line px-4 py-2 font-pixel text-[10px] text-soft transition-colors hover:border-accent-soft hover:text-body"
          >
            PHOTOGRAPHY
          </Link>
          <Link
            href="/resume"
            className="neon-box border border-accent/50 px-4 py-2 font-pixel text-[10px] text-accent-soft transition-colors hover:border-accent-soft hover:text-body"
          >
            RESUME
          </Link>
        </div>
      </div>
    </nav>
  );
}
