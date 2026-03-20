"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Event } from "@/lib/data";
import EventCard from "@/components/events/EventCard";

interface EventTimelineProps {
  events: Event[];
}

export default function EventTimeline({ events }: EventTimelineProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting;
        if (isVisible) {
          setVisibleCount((prev) => Math.min(prev + 4, events.length));
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [events.length]);

  const visibleEvents = useMemo(() => events.slice(0, visibleCount), [events, visibleCount]);

  return (
    <div>
      <div className="relative space-y-4 border-l border-black/10 pl-4 sm:space-y-5 sm:pl-6">
        {visibleEvents.map((event) => (
          <EventCard key={`${event.title}-${event.date}`} event={event} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-4" aria-hidden="true" />

      {visibleCount < events.length ? (
        <button
          type="button"
          onClick={() => setVisibleCount((prev) => Math.min(prev + 4, events.length))}
          className="mt-4 rounded-full border border-black/15 px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-black/5"
        >
          Load more
        </button>
      ) : null}
    </div>
  );
}
