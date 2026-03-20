import type { Metadata } from "next";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TimelineList from "@/components/profile/TimelineList";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Education",
  description: "Academic background of Abhijith B in Computer Science.",
  alternates: {
    canonical: "/profile/education",
  },
  openGraph: {
    title: "Education | Abhijith B",
    description: "Academic timeline and degree information.",
    url: "/profile/education",
  },
};

export default function ProfileEducationPage() {
  return (
    <section>
      <ProfileHeader
        eyebrow="Profile"
        title="Education"
        description="Formal academic background supporting my engineering and product journey."
      />
      <TimelineList
        title="Education Timeline"
        items={siteData.education.map((education) => ({
          title: education.institution,
          subtitle: education.degree,
          period: education.period,
        }))}
      />
    </section>
  );
}
