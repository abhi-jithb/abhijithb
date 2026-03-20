import Link from "next/link";
import { releases } from "@/lib/data";

export default function ReleasesSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      {/* Section Title */}
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        Releases
      </h2>

      {/* Releases List */}
      <div className="space-y-7 sm:space-y-8">
        {releases.map((release) => (
          <div
            key={release.id}
            className="flex flex-col gap-1.5"
          >
            {/* Date + Product */}
            <div className="flex flex-wrap items-baseline justify-center gap-4 sm:justify-start">
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
              className="ink-link mx-auto w-fit sm:mx-0"
            >
              Open repo
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
