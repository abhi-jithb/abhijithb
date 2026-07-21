import type { Metadata } from "next";
import ProjectsSection from "@/components/sections/ProjectsSection";
import { getRankedGitHubProjects } from "@/lib/github";

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

export default async function ProjectsPage() {
  const projects = await getRankedGitHubProjects(12); // Fetch up to 12 projects for the showcase
  return <ProjectsSection initialProjects={projects} />;
}
