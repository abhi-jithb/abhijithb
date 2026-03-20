import Link from "next/link";
import { events } from "@/lib/data";

const latestEvents = events.slice(0, 3);

export default function EventsSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      <div className="mb-10 flex flex-col items-center gap-3 sm:mb-12 sm:flex-row sm:justify-between">
        <h2 className="text-xl font-semibold">Events & Engagements</h2>
        <div className="flex items-center gap-4">
          <Link href="/events" className="text-sm text-neutral-600 transition-colors hover:text-black">
            View all -&gt;
          </Link>
          <Link href="/hackathons" className="text-sm text-neutral-600 transition-colors hover:text-black">
            Hackathons -&gt;
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {latestEvents.map((event) => (
          <article key={`${event.title}-${event.date}`} className="rounded-2xl border border-black/10 bg-white/80 p-4 text-center sm:text-left">
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
