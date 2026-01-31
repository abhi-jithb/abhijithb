import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import ReleasesSection from "@/components/sections/ReleasesSection";

export default function Page() {
  return (
    <main className="flex flex-col">
      {/* Home / Connection */}
      <section id="home">
        <HomeSection />
      </section>

      {/* About / Philosophy */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Projects */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Blog */}
      <section id="blog">
        <BlogSection />
      </section>

      {/* Releases */}
      <section id="releases">
        <ReleasesSection />
      </section>
    </main>
  );
}
