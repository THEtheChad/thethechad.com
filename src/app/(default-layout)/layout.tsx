import { ReactNode } from "react";
import { Navigation } from "@/app/(default-layout)/_components/Navigation/Navigation";
import { CrtOverlay } from "@/components/CrtOverlay/CrtOverlay";
import { RetroAmp } from "@/components/RetroAmp/RetroAmp";
import { AudioAnalyserProvider } from "@/contexts/AudioAnalyserContext";
import { Sidebar } from "./_components/Sidebar/Sidebar";

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
