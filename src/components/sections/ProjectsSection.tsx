import Link from "next/link";

const projects = [
  {
    year: 2025,
    title: "Community Learning Platform",
    description: "A platform to help students explore learning beyond academics.",
    links: [
      { label: "Repo", url: "https://github.com/abhi-jithb/project" },
      { label: "Live", url: "https://example.com" },
    ],
  },
  {
    year: 2024,
    title: "Personal Portfolio v2",
    description: "A minimal personal site focused on projects, writing, and releases.",
    links: [
      { label: "Repo", url: "https://github.com/abhi-jithb/portfolio" },
    ],
  },
];

export default function ProjectsSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-12">
        Projects
      </h2>

      {/* Projects List */}
      <div className="space-y-10">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col gap-2">
            {/* Year + Title */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-sm text-gray-500">
                {project.year}
              </span>

              <h3 className="text-base font-medium">
                {project.title}
              </h3>
            </div>

            {/* One-liner */}
            <p className="text-sm text-gray-700 max-w-2xl">
              {project.description}
            </p>

            {/* Links */}
            <div className="flex gap-4 text-sm">
              {project.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  className="text-gray-600 hover:text-black transition-colors"
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
