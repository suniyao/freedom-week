import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

const comicNeue = Comic_Neue({
    variable: "--font-comic-neue",
    subsets: ["latin"],
    weight: "400"
})

export const metadata: Metadata = {
  title: "mathkitten",
  description: "kawaii math self torture device :3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionWrapper>
      <body
        className={`${comicNeue.className} antialiased bg-amber-100 text-stone-900`}
      >
        {children}
      </body>
      </SessionWrapper>
    </html>
  );
}
