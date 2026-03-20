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
    <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      {/* Section Title */}
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        Releases
      </h2>

      {/* Releases List */}
      <div className="space-y-7 sm:space-y-8">
        {releases.map((release) => (
          <div
            key={`${release.product}-${release.version}`}
            className="flex flex-col gap-1.5"
          >
            {/* Date + Product */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-sm text-neutral-500">
                {release.date}
              </span>

              <h3 className="text-base font-medium text-neutral-900">
                {release.product}
              </h3>

              <span className="text-sm text-neutral-500">
                {release.version}
              </span>
            </div>

            {/* Repo link */}
            <Link
              href={release.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-neutral-600 transition-colors hover:text-black"
            >
              [Repo]
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
