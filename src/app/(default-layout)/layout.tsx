import type { ReactNode } from "react";
import { RetroAmp } from "@/components/RetroAmp/RetroAmp";
import { AudioAnalyserProvider } from "@/contexts/AudioAnalyserContext";
import { SiteFooter } from "./_components/SiteFooter/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader/SiteHeader";
import { SkipLink } from "./_components/SkipLink/SkipLink";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AudioAnalyserProvider>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="site-column">
        {children}
      </main>
      <SiteFooter />
      <RetroAmp />
    </AudioAnalyserProvider>
  );
}
