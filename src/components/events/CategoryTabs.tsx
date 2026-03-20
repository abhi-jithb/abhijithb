"use client";

import { useMemo, useState } from "react";
import type { Event, EventCategory } from "@/lib/data";
import CategoryFilter from "@/components/events/CategoryFilter";
import EventTimeline from "@/components/events/EventTimeline";

interface CategoryTabsProps {
  events: Event[];
}

const categoryOrder: EventCategory[] = ["organized", "hackathon", "experience", "mentorship"];

const categoryLabelMap: Record<EventCategory, string> = {
  organized: "Organized",
  hackathon: "Hackathons",
  experience: "Experiences",
  mentorship: "Mentorship",
};

export default function CategoryTabs({ events }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory>("organized");

  const filteredEvents = useMemo(
    () => events.filter((event) => event.category === activeCategory),
    [activeCategory, events]
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2.5 sm:mb-8">
        {categoryOrder.map((category) => (
          <CategoryFilter
            key={category}
            label={categoryLabelMap[category]}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <EventTimeline key={activeCategory} events={filteredEvents} />
    </div>
  );
}
