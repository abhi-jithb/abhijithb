import type { Metadata } from "next";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TagGrid from "@/components/profile/TagGrid";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Certifications completed by Abhijith B in GenAI and Google Cloud tracks.",
  alternates: {
    canonical: "/profile/certifications",
  },
  openGraph: {
    title: "Certifications | Abhijith B",
    description: "GenAI and cloud certifications.",
    url: "/profile/certifications",
  },
};

export default function ProfileCertificationsPage() {
  return (
    <section>
      <ProfileHeader
        eyebrow="Profile"
        title="Certifications"
        description="Learning milestones completed through practical AI and cloud infrastructure tracks."
      />
      <TagGrid title="Certification List" items={siteData.certifications} />
    </section>
  );
}
