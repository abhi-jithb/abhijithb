import Link from "next/link";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  const featuredProject = projects.find((project) => project.featured);

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      {/* Section Title */}
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        Projects
      </h2>

      {featuredProject ? (
        <div className="mb-9 rounded-2xl border border-black/10 bg-white/75 p-5 sm:mb-10 sm:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Featured Project
          </p>
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 sm:text-xl">
            {featuredProject.title}
          </h3>
          <p className="mb-4 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
            {featuredProject.description}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {featuredProject.links.map((link) => (
              <Link
                key={`${featuredProject.id}-${link.label}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 transition-colors hover:text-black"
              >
                [{link.label}]
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {/* Projects List */}
      <div className="space-y-9 sm:space-y-10">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col gap-2.5">
            {/* Year + Title */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-sm text-neutral-500">
                {project.year}
              </span>

              <h3 className="text-base font-medium text-neutral-900">
                {project.title}
              </h3>
            </div>

            {/* One-liner */}
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-700">
              {project.description}
            </p>

            {/* Links */}
            <div className="flex gap-4 text-sm">
              {project.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors hover:text-black"
                >
                  [{link.label}]
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
