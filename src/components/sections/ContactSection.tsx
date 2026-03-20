import { siteData } from "@/lib/data";

export default function ContactSection() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="rounded-2xl border border-black/10 bg-white/75 p-6 sm:p-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
          Contact
        </p>
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Let us build something useful.
        </h2>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
          If my work resonates with you, reach out and we can discuss ideas, products, or collaborations.
        </p>
        <a
          href={`mailto:${siteData.email}`}
          className="inline-flex items-center rounded-full border border-black px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
        >
          Email Me
        </a>
      </div>
    </div>
  );
}
