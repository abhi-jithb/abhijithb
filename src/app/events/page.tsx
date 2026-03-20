import type { Metadata } from "next";
import CategoryTabs from "@/components/events/CategoryTabs";
import { events } from "@/lib/data";

export const metadata: Metadata = {
  title: "Events & Engagements",
  description: "Organized programs, hackathons, mentorship sessions, and community experiences of Abhijith B.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Engagements | Abhijith B",
    description: "Track events, hackathons, and mentorship engagements.",
    url: "/events",
  },
};

const stats = {
  organized: events.filter((event) => event.category === "organized").length,
  hackathon: events.filter((event) => event.category === "hackathon").length,
  mentorship: events.filter((event) => event.category === "mentorship").length,
};

export default function EventsPage() {
  return (
    <section>
      <header className="mb-8 sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Community Track Record</p>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">Events & Engagements</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-700 sm:text-base">
          A categorized timeline of organizing, building, mentoring, and community moments across Kerala&apos;s tech ecosystem.
        </p>
      </header>

      <div className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Organized</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats.organized}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Hackathons</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats.hackathon}</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/80 p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-neutral-500">Mentored Sessions</p>
          <p className="text-2xl font-semibold text-neutral-900">{stats.mentorship}</p>
        </div>
      </div>

      <CategoryTabs events={events} />
    </section>
  );
}
