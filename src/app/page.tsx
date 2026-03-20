import type { Metadata } from "next";
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EventsSection from "@/components/sections/EventsSection";
import BlogSection from "@/components/sections/BlogSection";
import ReleasesSection from "@/components/sections/ReleasesSection";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore projects, events, writing, releases, and profile work of Abhijith B.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abhijith B | Portfolio",
    description: "Explore projects, events, writing, and releases.",
    url: "/",
  },
};

export default function Page() {
  return (
    <main className="editorial-main flex flex-col">
      <section id="home" className="section-rhythm section-rhythm-home">
        <HomeSection />
      </section>

      <section id="about" className="section-rhythm">
        <AboutSection />
      </section>

      <section id="projects" className="section-rhythm">
        <ProjectsSection />
      </section>

      <section id="events" className="section-rhythm">
        <EventsSection />
      </section>

      <section id="blog" className="section-rhythm">
        <BlogSection />
      </section>

      <section id="releases" className="section-rhythm">
        <ReleasesSection />
      </section>

      <section id="contact" className="section-rhythm">
        <ContactSection />
      </section>
    </main>
  );
}
