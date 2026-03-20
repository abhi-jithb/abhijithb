import type { Metadata } from "next";
import ReleasesSection from "@/components/sections/ReleasesSection";

export const metadata: Metadata = {
  title: "Releases",
  description: "Track product and portfolio release updates from Abhijith B.",
  alternates: {
    canonical: "/releases",
  },
  openGraph: {
    title: "Releases | Abhijith B",
    description: "Versioned release updates across projects.",
    url: "/releases",
  },
};

export default function ReleasesPage() {
  return <ReleasesSection />;
}
