import Link from "next/link";

const releases = [
  {
    date: "2025-01-12",
    product: "Community Learning Platform",
    version: "v0.3",
    repo: "https://github.com/abhi-jithb/project",
  },
  {
    date: "2024-09-05",
    product: "Personal Portfolio",
    version: "v1.0",
    repo: "https://github.com/abhi-jithb/portfolio",
  },
];

export default function ReleasesSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-12">
        Releases
      </h2>

      {/* Releases List */}
      <div className="space-y-8">
        {releases.map((release) => (
          <div
            key={`${release.product}-${release.version}`}
            className="flex flex-col gap-1"
          >
            {/* Date + Product */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-sm text-gray-500">
                {release.date}
              </span>

              <h3 className="text-base font-medium">
                {release.product}
              </h3>

              <span className="text-sm text-gray-500">
                {release.version}
              </span>
            </div>

            {/* Repo link */}
            <Link
              href={release.repo}
              target="_blank"
              className="text-sm text-gray-600 hover:text-black transition-colors w-fit"
            >
              [Repo]
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
