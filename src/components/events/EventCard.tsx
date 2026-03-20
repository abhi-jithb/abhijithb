"use client";

import { motion } from "framer-motion";
import type { Event, EventCategory } from "@/lib/data";

const categoryLabelMap: Record<EventCategory, string> = {
  organized: "Organized",
  hackathon: "Hackathon",
  experience: "Experience",
  mentorship: "Mentorship",
};

const categoryClassMap: Record<EventCategory, string> = {
  organized: "bg-emerald-100 text-emerald-800",
  hackathon: "bg-blue-100 text-blue-800",
  experience: "bg-amber-100 text-amber-800",
  mentorship: "bg-purple-100 text-purple-800",
};

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-black/10 bg-white/80 p-5 sm:p-6"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${categoryClassMap[event.category]}`}>
          {categoryLabelMap[event.category]}
        </span>
        <span className="text-xs text-neutral-500 sm:text-sm">{event.date}</span>
      </div>

      <h3 className="mb-1 text-lg font-semibold text-neutral-900">{event.title}</h3>
      <p className="mb-1 text-sm font-medium text-neutral-700">{event.role}</p>
      {event.location ? <p className="mb-3 text-xs text-neutral-500 sm:text-sm">{event.location}</p> : null}

      <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">{event.description}</p>

      {event.outcome ? (
        <p className="mt-3 text-sm font-medium text-neutral-800">Outcome: {event.outcome}</p>
      ) : null}

      {event.highlights?.length ? (
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-700">
          {event.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}

      {event.links?.length ? (
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {event.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 transition-colors hover:text-black"
            >
              [{link.label}]
            </a>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}
