import type { Metadata } from "next";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TagGrid from "@/components/profile/TagGrid";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skills",
  description: "Top skills of Abhijith B across mentoring, software development, and engineering practice.",
  alternates: {
    canonical: "/profile/skills",
  },
  openGraph: {
    title: "Skills | Abhijith B",
    description: "Core technical and mentoring skills.",
    url: "/profile/skills",
  },
};

export default function ProfileSkillsPage() {
  return (
    <section>
      <ProfileHeader
        eyebrow="Profile"
        title="Skills"
        description="Core strengths built through open source, mentoring, and shipping software in public."
      />
      <TagGrid title="Top Skills" items={siteData.topSkills} />
    </section>
  );
}
