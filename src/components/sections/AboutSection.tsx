import { siteData } from "@/lib/data";

export default function AboutSection() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        About
      </h2>
      {/* Narrative */}
      <div className="space-y-5 text-sm leading-relaxed text-neutral-800 sm:text-base">
        {siteData.summary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* Divider */}
      <div className="my-10 h-px w-full bg-neutral-300/80 sm:my-12" />

      {/* Philosophies */}
      <div>
        <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Things I believe in
        </h2>

        <ul className="list-inside list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
          {siteData.principles.map((principle) => (
            <li key={principle}>{principle}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-5 sm:mt-12 sm:p-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Top Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {siteData.topSkills.map((skill) => (
            <span key={skill} className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-700 sm:text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-5 sm:mt-12 sm:p-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Certifications
        </h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
          {siteData.certifications.map((certification) => (
            <li key={certification}>{certification}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-5 sm:mt-12 sm:p-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Experience
        </h3>
        <div className="space-y-4">
          {siteData.experiences.map((experience) => (
            <div key={`${experience.organization}-${experience.role}`}>
              <p className="text-sm font-medium text-neutral-900 sm:text-base">{experience.role}</p>
              <p className="text-sm text-neutral-700">{experience.organization}</p>
              <p className="text-xs text-neutral-500 sm:text-sm">{experience.period}</p>
              {experience.location ? <p className="text-xs text-neutral-500 sm:text-sm">{experience.location}</p> : null}
              {experience.notes ? <p className="mt-1 text-sm text-neutral-700">{experience.notes}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-5 sm:mt-12 sm:p-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Education
        </h3>
        <div className="space-y-3">
          {siteData.education.map((educationItem) => (
            <div key={educationItem.institution}>
              <p className="text-sm font-medium text-neutral-900 sm:text-base">{educationItem.institution}</p>
              <p className="text-sm text-neutral-700">{educationItem.degree}</p>
              <p className="text-xs text-neutral-500 sm:text-sm">{educationItem.period}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-black/10 bg-white/70 p-5 sm:mt-12 sm:p-6">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-neutral-500 sm:text-sm">
          Public Insights
        </h3>
        <ul className="list-inside list-disc space-y-2 text-sm text-neutral-700 sm:text-base">
          {siteData.insights.map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
