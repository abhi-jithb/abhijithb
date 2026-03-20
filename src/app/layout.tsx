  import type { Metadata } from "next";
  import { Caveat, Geist, Geist_Mono, Newsreader } from "next/font/google";
  import { Analytics } from "@vercel/analytics/react";
  import Navbar from "@/components/Navbar";
  import "./globals.css";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  const caveat = Caveat({
    variable: "--font-caveat",
    subsets: ["latin"],
    weight: ["500", "600", "700"],
  });

  const newsreader = Newsreader({
    variable: "--font-newsreader",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  });

  export const metadata: Metadata = {
    metadataBase: new URL("https://abhijithb.vercel.app"),
    title: {
      default: "Abhijith B | Portfolio",
      template: "%s | Abhijith B",
    },
    description: "Minimal portfolio of Abhijith B featuring projects, events, writing, releases, and profile insights.",
    openGraph: {
      type: "website",
      title: "Abhijith B | Portfolio",
      description: "Projects, events, writing, and releases by Abhijith B.",
      url: "https://abhijithb.vercel.app",
      siteName: "Abhijith Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: "Abhijith B | Portfolio",
      description: "Projects, events, writing, and releases by Abhijith B.",
    },
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} ${newsreader.variable} antialiased text-neutral-900`}
        >
          <Navbar />
          <div className="pt-16">{children}</div>
          <Analytics />
        </body>
      </html>
    );
  }
