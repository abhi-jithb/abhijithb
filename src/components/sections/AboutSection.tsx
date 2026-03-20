import Link from "next/link";
import { siteData } from "@/lib/data";

export default function AboutSection() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      <p className="section-kicker mb-2">A little context</p>
      <h2 className="section-title mb-10 sm:mb-12">
        About
      </h2>
      {/* Narrative */}
      <div className="space-y-5 text-sm leading-relaxed text-neutral-800 sm:text-base">
        {siteData.summary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* Divider */}
      <div className="my-10 h-px w-full bg-neutral-300/80 sm:my-12" />

      <div>
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Things I believe in
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
          {siteData.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2">
        {siteData.profilePages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="paper-panel rounded-2xl p-5 text-center transition-colors hover:bg-white sm:text-left"
          >
            <p className="mb-1 text-base font-medium text-neutral-900">{page.title}</p>
            <p className="text-sm text-neutral-700">{page.description}</p>
          </Link>
        ))}
      </div>

      <div className="paper-panel mt-10 rounded-2xl p-5 sm:mt-12 sm:p-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Public Insights
        </h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
          {siteData.insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
