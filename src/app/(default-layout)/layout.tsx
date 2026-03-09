import type { Metadata } from "next";
import { Geist, Geist_Mono, VT323, Press_Start_2P } from "next/font/google";
import { Background } from "@/components/Background/Background";
import { CrtOverlay } from "@/components/CrtOverlay/CrtOverlay";
import { RetroAmp } from "@/components/RetroAmp/RetroAmp";
import { AudioAnalyserProvider } from "@/contexts/AudioAnalyserContext";
import { RezColumns } from "@/components/RezColumns/RezColumns";
import { Navigation } from "@/app/(default-layout)/_components/Navigation/Navigation";
import { Sidebar } from "./_components/Sidebar/Sidebar";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <AudioAnalyserProvider>
      <Sidebar className="fixed left-0 top-0 bottom-20 w-65 overflow-y-auto" />
      <div className="fixed right-0 top-0 bottom-20" style={{ left: "260px" }}>
        <div className="h-full overflow-y-auto">
          <Navigation />
          <main className="px-8 py-4">{children}</main>
          <CrtOverlay />
        </div>
      </div>

      <RetroAmp />
    </AudioAnalyserProvider>
  );
}
