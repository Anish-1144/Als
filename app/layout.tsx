// Copyright (C) 2025 Anuj
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SiteShell from "./components/SiteShell";
import { getFooterData, getNavigationData, getPopupData } from "@/lib/api-server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const besley = localFont({
  src: [
    { path: "../fonts/Besly/Besley-Book.ttf", weight: "400", style: "normal" },
    {
      path: "../fonts/Besly/Besley-BookItalic.ttf",
      weight: "400",
      style: "italic",
    },
    { path: "../fonts/Besly/Besley-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "../fonts/Besly/Besley-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    { path: "../fonts/Besly/Besley-Semi.ttf", weight: "600", style: "normal" },
    {
      path: "../fonts/Besly/Besley-SemiItalic.ttf",
      weight: "600",
      style: "italic",
    },
    { path: "../fonts/Besly/Besley-Bold.ttf", weight: "700", style: "normal" },
    {
      path: "../fonts/Besly/Besley-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    { path: "../fonts/Besly/Besley-Heavy.ttf", weight: "800", style: "normal" },
    {
      path: "../fonts/Besly/Besley-HeavyItalic.ttf",
      weight: "800",
      style: "italic",
    },
    { path: "../fonts/Besly/Besley-Fatface.ttf", weight: "900", style: "normal" },
    {
      path: "../fonts/Besly/Besley-FatfaceItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-besley",
});

const author = localFont({
  src: [
    {
      path: "../fonts/Author/Fonts/TTF/Author-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/Author/Fonts/TTF/Author-VariableItalic.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-author",
});

export const metadata: Metadata = {
  title: "ALS Mortgage Solutions",
  description:
    "Expert mortgage brokers helping Australian families secure their dream homes.",
};

/** Always fetch fresh CMS content — admin edits show on next page load */
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [footerData, popupData, navigationData] = await Promise.all([
    getFooterData(),
    getPopupData(),
    getNavigationData(),
  ]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${besley.variable} ${author.variable} antialiased`}
      >
        <SiteShell footerData={footerData} popupData={popupData} navigationData={navigationData}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
