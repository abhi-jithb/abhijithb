import Link from "next/link";
import { getRankedGitHubProjects } from "@/lib/github";

export default async function ProjectsSection() {
  const projects = await getRankedGitHubProjects();
  const featuredProject = projects[0];

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      <p className="section-kicker mb-2">Things I shipped</p>
      <h2 className="section-title mb-10 sm:mb-12">
        Projects
      </h2>
      <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0 sm:mb-10 sm:text-base">
        Every project here started as something I built for fun, curiosity, and real-world tinkering.
      </p>

      {featuredProject ? (
        <div className="paper-panel mb-9 rounded-2xl p-5 sm:mb-10 sm:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            #1 Ranked Project
          </p>
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 sm:text-xl">
            {featuredProject.name}
          </h3>
          <p className="mx-auto mb-4 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0 sm:text-base">
            {featuredProject.description}
          </p>
          <div className="mb-4 flex flex-wrap justify-center gap-2 text-xs sm:justify-start">
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-neutral-700">
              Stars: {featuredProject.stars}
            </span>
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-neutral-700">
              Commits: {featuredProject.commits}
            </span>
            <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-neutral-700">
              Languages: {featuredProject.languages.join(", ") || "N/A"}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
            <Link
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link"
            >
              Open repo
            </Link>
          </div>
        </div>
      ) : null}

      {/* Projects List */}
      <div className="space-y-9 sm:space-y-10">
        {projects.map((project, index) => (
          <div key={project.id} className="flex flex-col gap-2.5">
            {/* Year + Title */}
            <div className="flex flex-wrap items-baseline justify-center gap-4 sm:justify-start">
              <span className="text-sm text-neutral-500">
                #{index + 1}
              </span>

              <h3 className="text-base font-medium text-neutral-900">
                {project.name}
              </h3>
            </div>

            {/* One-liner */}
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0">
              {project.description}
            </p>

            <div className="flex flex-wrap justify-center gap-2 text-xs sm:justify-start">
              <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-neutral-700">
                Stars: {project.stars}
              </span>
              <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-neutral-700">
                Commits: {project.commits}
              </span>
              <span className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-neutral-700">
                Languages: {project.languages.join(", ") || "N/A"}
              </span>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:justify-start">
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ink-link"
              >
                Open repo
              </Link>
            </div>
          </div>
        ))}

        {projects.length === 0 ? (
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-600 sm:mx-0">
            Live project data is temporarily unavailable. Please check again shortly.
          </p>
        ) : null}
      </div>
    </div>
  );
}
