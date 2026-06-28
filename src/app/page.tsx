import type { Metadata } from "next";
import HomeSection from "@/components/sections/HomeSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore projects, events, writing, releases, and profile work of Abhijith B.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abhijith B | Portfolio",
    description: "Explore projects, events, writing, and releases.",
    url: "/",
  },
};

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden">
      <HomeSection />
    </main>
  );
}
