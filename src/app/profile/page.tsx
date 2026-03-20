import type { Metadata } from "next";
import Link from "next/link";
import ProfileHeader from "@/components/features/profile/ProfileHeader";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profile",
  description: "Professional profile overview for Abhijith B including skills, certifications, experience, and education.",
  alternates: {
    canonical: "/profile",
  },
  openGraph: {
    title: "Profile | Abhijith B",
    description: "Explore skills, certifications, experience, and education.",
    url: "/profile",
  },
};

export default function ProfileOverviewPage() {
  return (
    <section>
      <ProfileHeader
        eyebrow="Professional Profile"
        title="Profile Overview"
        description="A structured view of my work background, strengths, certifications, and education for collaborators, recruiters, and community peers."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {siteData.profilePages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-2xl border border-black/10 bg-white/80 p-5 transition-colors hover:bg-white"
          >
            <h2 className="mb-1 text-lg font-medium text-neutral-900">{page.title}</h2>
            <p className="text-sm text-neutral-700">{page.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
