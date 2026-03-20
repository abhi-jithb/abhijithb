import Link from "next/link";
import { events } from "@/lib/data";

const latestEvents = events.slice(0, 3);

export default function EventsSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      <p className="section-kicker mb-2">Community pulse</p>
      <div className="mb-10 flex flex-col items-center gap-3 sm:mb-12 sm:flex-row sm:justify-between">
        <h2 className="section-title">Events & Engagements</h2>
        <div className="flex items-center gap-4">
          <Link href="/events" className="ghost-link">
            View all -&gt;
          </Link>
          <Link href="/hackathons" className="ghost-link">
            Hackathons -&gt;
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {latestEvents.map((event) => (
          <article key={`${event.title}-${event.date}`} className="paper-panel rounded-2xl p-4 text-center sm:text-left">
            <p className="mb-2 text-xs uppercase tracking-[0.12em] text-neutral-500">{event.category}</p>
            <h3 className="mb-1 text-base font-medium text-neutral-900">{event.title}</h3>
            <p className="mb-2 text-xs text-neutral-500">{event.date}</p>
            <p className="text-sm text-neutral-700">{event.role}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
