interface TagGridProps {
  title: string;
  items: string[];
}

export default function TagGrid({ title, items }: TagGridProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/80 p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-600">{title}</h2>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-700 sm:text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
