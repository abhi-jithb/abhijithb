import type { Metadata } from "next";
import  ProjectsSection  from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse selected software projects built by Abhijith B.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Abhijith B",
    description: "Selected software projects and product work.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
