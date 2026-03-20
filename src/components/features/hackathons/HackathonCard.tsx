import type { Hackathon } from "@/lib/data";

interface HackathonCardProps {
  item: Hackathon;
}

export default function HackathonCard({ item }: HackathonCardProps) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white/80 p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{item.date}</span>
        {item.organized ? (
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs text-emerald-800">Organized</span>
        ) : (
          <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-800">Participated</span>
        )}
      </div>

      <h2 className="mb-1 text-lg font-semibold text-neutral-900">{item.title}</h2>
      <p className="mb-1 text-sm font-medium text-neutral-700">{item.role}</p>
      {item.location ? <p className="mb-3 text-xs text-neutral-500 sm:text-sm">{item.location}</p> : null}

      {item.project ? <p className="text-sm text-neutral-700">Project: {item.project}</p> : null}
      {item.outcome ? <p className="mt-2 text-sm font-medium text-neutral-800">Outcome: {item.outcome}</p> : null}
    </article>
  );
}
