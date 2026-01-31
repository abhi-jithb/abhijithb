export default function AboutSection() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-xl font-semibold mb-12">
        About   
      </h2>
      {/* Narrative */}
      <div className="space-y-6 text-gray-800">
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
      <div className="my-12 h-px w-full bg-gray-200" />

      {/* Philosophies */}
      <div>
        <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4">
          Things I believe in
        </h2>

        <ul className="space-y-3 text-gray-700 list-disc list-inside">
          <li>Technology is a tool, not who we are</li>
          <li>Helping people grow matters more than being right</li>
          <li>Mental models matter more than arguments</li>
          <li>Learning never really ends</li>
        </ul>
      </div>
    </div>
  );
}
