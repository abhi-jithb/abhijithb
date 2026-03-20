import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Abhijith B's philosophy, learning approach, and values.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Abhijith B",
    description: "Values and approach behind Abhijith B's work.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutSection />
    </main>
  );
}
