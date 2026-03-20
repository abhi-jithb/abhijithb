interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  note?: string;
}

interface TimelineListProps {
  title: string;
  items: TimelineItem[];
}

export default function TimelineList({ title, items }: TimelineListProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/80 p-5 sm:p-6">
      <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.12em] text-neutral-600">{title}</h2>
      <div className="space-y-5">
        {items.map((item) => (
          <article key={`${item.title}-${item.subtitle}-${item.period}`} className="border-l border-black/15 pl-4">
            <h3 className="text-base font-medium text-neutral-900">{item.title}</h3>
            <p className="text-sm text-neutral-700">{item.subtitle}</p>
            <p className="text-xs text-neutral-500 sm:text-sm">{item.period}</p>
            {item.location ? <p className="text-xs text-neutral-500 sm:text-sm">{item.location}</p> : null}
            {item.note ? <p className="mt-1 text-sm text-neutral-700">{item.note}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
