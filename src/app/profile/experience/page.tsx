import type { Metadata } from "next";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TimelineList from "@/components/profile/TimelineList";
import { siteData } from "@/lib/data";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional and community leadership experience of Abhijith B.",
  alternates: {
    canonical: "/profile/experience",
  },
  openGraph: {
    title: "Experience | Abhijith B",
    description: "Timeline of roles in community leadership and software development.",
    url: "/profile/experience",
  },
};

export default function ProfileExperiencePage() {
  return (
    <section>
      <ProfileHeader
        eyebrow="Profile"
        title="Experience"
        description="A timeline of leadership, mentoring, and product development roles."
      />
      <TimelineList
        title="Experience Timeline"
        items={siteData.experiences.map((experience) => ({
          title: experience.role,
          subtitle: experience.organization,
          period: experience.period,
          location: experience.location,
          note: experience.notes,
        }))}
      />
    </section>
  );
}
