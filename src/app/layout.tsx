import type { Metadata } from "next";
import { Geist, Geist_Mono, VT323, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background/Background";
import { CrtOverlay } from "@/components/CrtOverlay/CrtOverlay";
import { RetroAmp } from "@/components/RetroAmp/RetroAmp";
import { AudioAnalyserProvider } from "@/contexts/AudioAnalyserContext";
import { RezColumns } from "@/components/RezColumns/RezColumns";
import { Nav } from "@/app/_components/Nav/Nav";
import { Sidebar } from "./_components/Sidebar/Sidebar";
import { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chad",
  description: "Software engineer, builder, and maker of things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} ${pressStart2P.variable} antialiased text-body`}
      >
        <Background />
        <AudioAnalyserProvider>
          {/* Fixed sidebar */}
          <Sidebar className="fixed left-0 top-0 bottom-20 w-65 overflow-y-auto" />

          {/* Content area — outer wrapper is the positioning context for overlays */}
          <div
            className="fixed right-0 top-0 bottom-20"
            style={{ left: "260px" }}
          >
            {/* Scrollable content */}
            <div className="h-full overflow-y-auto">
              <Nav />
              <main className="px-8 py-4">{children}</main>
            </div>

            {/* CRT + Rez overlays scoped to content area only */}
            <div className="pointer-events-none absolute inset-0 z-50">
              <CrtOverlay />
              <RezColumns />
            </div>
          </div>

          <RetroAmp />
        </AudioAnalyserProvider>
      </body>
    </html>
  );
}
