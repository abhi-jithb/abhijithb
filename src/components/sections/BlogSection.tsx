import Link from "next/link";

const blogs = [
  {
    date: "2025-01-18",
    title: "Learning in Public Is Uncomfortable — And That’s the Point",
    summary:
      "Why sharing unfinished thoughts matters more than polished outcomes.",
    url: "https://yourname.substack.com/p/example-1",
  },
  {
    date: "2024-11-02",
    title: "Technology Is a Tool, Not an Identity",
    summary:
      "Reflections on how we often confuse what we use with who we are.",
    url: "https://yourname.substack.com/p/example-2",
  },
];

export default function BlogSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      {/* Section Title */}
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        Writing
      </h2>

      {/* Blog List */}
      <div className="space-y-9 sm:space-y-10">
        {blogs.map((blog) => (
          <div key={blog.title} className="flex flex-col gap-2.5">
            {/* Date + Title */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-sm text-neutral-500">
                {blog.date}
              </span>

              <h3 className="text-base font-medium text-neutral-900">
                {blog.title}
              </h3>
            </div>

            {/* Summary */}
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-700">
              {blog.summary}
            </p>

            {/* Read link */}
            <Link
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-neutral-600 transition-colors hover:text-black"
            >
              [Read]
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
