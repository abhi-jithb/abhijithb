import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import ReleasesSection from "@/components/sections/ReleasesSection";

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
    </main>
  );
}
