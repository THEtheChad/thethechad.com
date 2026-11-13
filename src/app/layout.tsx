import type { Metadata } from "next";
import {
  Cedarville_Cursive,
  Geist,
  Geist_Mono,
  Yellowtail,
} from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import { themeInitScript } from "@/components/ThemeToggle/theme";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const yellowtail = Yellowtail({
  weight: "400",
  variable: "--font-yellowtail",
  subsets: ["latin"],
  display: "swap",
});

const cedarville = Cedarville_Cursive({
  weight: "400",
  variable: "--font-cedarville",
  subsets: ["latin"],
  display: "swap",
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
    // Font variables live on <html> because globals.css reads them there.
    // suppressHydrationWarning: the pre-paint script may set data-theme
    // before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${yellowtail.variable} ${cedarville.variable}`}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party pre-paint theme script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Hide controls that need JS when it is off. */}
        <noscript>
          <style>{".js-only{display:none!important}"}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
