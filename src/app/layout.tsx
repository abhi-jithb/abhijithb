  import type { Metadata } from "next";
  import { Geist, Geist_Mono } from "next/font/google";
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

  export const metadata: Metadata = {
    metadataBase: new URL("https://abhijithb.vercel.app"),
    title: {
      default: "Abhijith B | Portfolio",
      template: "%s | Abhijith B",
    },
    description: "Minimal portfolio of Abhijith B featuring projects, writing, releases, and contact.",
    openGraph: {
      type: "website",
      title: "Abhijith B | Portfolio",
      description: "Projects, writing, and releases by Abhijith B.",
      url: "https://abhijithb.vercel.app",
      siteName: "Abhijith Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: "Abhijith B | Portfolio",
      description: "Projects, writing, and releases by Abhijith B.",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased text-neutral-900`}
        >
          <Navbar />
          <div className="pt-16">{children}</div>
        </body>
      </html>
    );
  }
