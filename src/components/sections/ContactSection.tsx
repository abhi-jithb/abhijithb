import { siteData } from "@/lib/data";

export default function ContactSection() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      <div className="paper-panel rounded-2xl p-6 sm:p-8">
        <p className="section-kicker mb-2">Say hello</p>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Contact
        </p>
        <h2 className="section-title mb-3 text-neutral-900 sm:text-4xl">
          Let us build something useful.
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-neutral-700 sm:mx-0 sm:text-base">
          If my work resonates with you, reach out and we can discuss ideas, products, or collaborations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <a
            href={`mailto:${siteData.email}`}
            className="inline-flex items-center rounded-full border border-black px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
          >
            Email Me
          </a>
          <a
            href={siteData.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-black/20 px-5 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-black/5"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
