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
    <div className="max-w-4xl mx-auto px-6 py-24">
      {/* Section Title */}
      <h2 className="text-xl font-semibold mb-12">
        Writing
      </h2>

      {/* Blog List */}
      <div className="space-y-10">
        {blogs.map((blog) => (
          <div key={blog.title} className="flex flex-col gap-2">
            {/* Date + Title */}
            <div className="flex flex-wrap items-baseline gap-4">
              <span className="text-sm text-gray-500">
                {blog.date}
              </span>

              <h3 className="text-base font-medium">
                {blog.title}
              </h3>
            </div>

            {/* Summary */}
            <p className="text-sm text-gray-700 max-w-2xl">
              {blog.summary}
            </p>

            {/* Read link */}
            <Link
              href={blog.url}
              target="_blank"
              className="text-sm text-gray-600 hover:text-black transition-colors w-fit"
            >
              [Read]
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
