import type { Metadata } from "next";
import HackathonShowcase from "@/components/features/hackathons/HackathonShowcase";
import { hackathonProjects, hackathonSummary } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "Hackathon track record of Abhijith B across participation, organizing, mentorship, and outcomes.",
  alternates: {
    canonical: "/hackathons",
  },
  openGraph: {
    title: "Hackathons | Abhijith B",
    description: "Builder-under-pressure showcase with key hackathon outcomes.",
    url: "/hackathons",
  },
};

export default function HackathonsPage() {
  return (
    <section>
      <header className="mb-8 sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Builder Under Pressure</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">Hackathons</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
          A focused showcase of hackathons across participation, organizing, and mentorship in Kerala&apos;s tech communities.
        </p>
      </header>

      <div className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-4">
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Total</p>
          <p className="text-2xl font-semibold text-neutral-900">{hackathonSummary.total}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Organized</p>
          <p className="text-2xl font-semibold text-neutral-900">{hackathonSummary.organized}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Participated</p>
          <p className="text-2xl font-semibold text-neutral-900">{hackathonSummary.participated}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Home Campus</p>
          <p className="text-sm font-semibold text-neutral-900">{hackathonSummary.homeCampus}</p>
        </div>
      </div>

      <HackathonShowcase />

      <div className="mt-8 rounded-2xl border border-black/10 bg-white/80 p-5 sm:p-6">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-neutral-600">Key Hackathon Projects</h2>
        <ul className="space-y-2 text-sm text-neutral-700 sm:text-base">
          {hackathonProjects.map((project) => (
            <li key={project.name}>
              <span className="font-medium text-neutral-900">{project.name}</span>: {project.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
