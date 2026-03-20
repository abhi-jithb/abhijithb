import type { Metadata } from "next";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import ReleasesSection from "@/components/sections/ReleasesSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore the portfolio of Abhijith B: projects, writing, releases, and contact.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abhijith B | Portfolio",
    description: "Explore projects, writing, and releases.",
    url: "/",
  },
};

export default function Page() {
  return (
    <main className="flex flex-col">
      <section id="home">
        <HomeSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="blog">
        <BlogSection />
      </section>

      <section id="releases">
        <ReleasesSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
