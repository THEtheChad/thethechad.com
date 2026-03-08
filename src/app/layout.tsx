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
import React from "react";

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
  content,
}: Readonly<{
  content: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} ${pressStart2P.variable} antialiased text-body`}
      >
        <Background />
        <CrtOverlay />
        <AudioAnalyserProvider>
          <RezColumns />

          {/* Fixed sidebar */}
          <Sidebar className="fixed left-0 top-0 bottom-20 w-72 overflow-y-auto" />

          {/* Scrollable content area */}
          <div
            className="fixed right-0 top-0 bottom-20 overflow-y-auto"
            style={{ left: "288px" }}
          >
            <Nav />
            <main className="px-8 py-4">{content}</main>
          </div>

          <RetroAmp />
        </AudioAnalyserProvider>
      </body>
    </html>
  );
}
