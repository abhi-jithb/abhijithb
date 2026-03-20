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
  const availableCategories = useMemo(
    () => categoryOrder.filter((category) => events.some((event) => event.category === category)),
    [events]
  );
  const [activeCategory, setActiveCategory] = useState<EventCategory>(availableCategories[0] ?? "organized");

  const effectiveCategory = availableCategories.includes(activeCategory)
    ? activeCategory
    : availableCategories[0] ?? "organized";

  const filteredEvents = useMemo(
    () => events.filter((event) => event.category === effectiveCategory),
    [effectiveCategory, events]
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2.5 sm:mb-8">
        {availableCategories.map((category) => (
          <CategoryFilter
            key={category}
            label={categoryLabelMap[category]}
            active={effectiveCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      <EventTimeline key={effectiveCategory} events={filteredEvents} />
    </div>
  );
}
