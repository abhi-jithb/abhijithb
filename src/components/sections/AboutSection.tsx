export default function AboutSection() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        About
      </h2>
      {/* Narrative */}
      <div className="space-y-5 text-sm leading-relaxed text-neutral-800 sm:text-base">
        <p>
          I don’t see technology as an identity. I see it as a tool — something
          that helps me explore ideas, solve problems, and support the people
          around me.
        </p>

        <p>
          What gives me the most satisfaction is not just building things, but
          seeing people grow because something I built, shared, or explained
          made things clearer for them.
        </p>

        <p>
          I learn by building, reflecting in public, questioning my own mental
          models, and staying curious — even when I don’t have all the answers.
        </p>
      </div>

      {/* Divider */}
      <div className="my-10 h-px w-full bg-neutral-300/80 sm:my-12" />

      {/* Philosophies */}
      <div>
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Things I believe in
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
          <li>Technology is a tool, not who we are</li>
          <li>Helping people grow matters more than being right</li>
          <li>Mental models matter more than arguments</li>
          <li>Learning never really ends</li>
        </ul>
      </div>
    </div>
  );
}
