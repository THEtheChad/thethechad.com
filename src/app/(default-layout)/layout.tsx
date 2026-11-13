import type { ReactNode } from "react";
import { loadAlbums } from "@/components/TapeDeck/loadAlbums";
import { TapeDeck } from "@/components/TapeDeck/TapeDeck";
import { SiteFooter } from "./_components/SiteFooter/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader/SiteHeader";
import { SkipLink } from "./_components/SkipLink/SkipLink";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="site-column">
        {children}
      </main>
      <SiteFooter />
      {/* Album listing is read at build time; the deck stays mounted across
          client navigation, so playback continues from page to page. */}
      <TapeDeck albums={loadAlbums()} />
    </>
  );
}
