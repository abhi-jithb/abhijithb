import Link from "next/link";
import { blogPosts } from "@/lib/data";

export default function BlogSection() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      {/* Section Title */}
      <h2 className="mb-10 text-xl font-semibold sm:mb-12">
        Writing
      </h2>

      {/* Blog List */}
      <div className="space-y-9 sm:space-y-10">
        {blogPosts.map((blog) => (
          <div key={blog.title} className="flex flex-col gap-2.5">
            {/* Date + Title */}
            <div className="flex flex-wrap items-baseline justify-center gap-4 sm:justify-start">
              <span className="text-sm text-neutral-500">
                {blog.date}
              </span>

              <h3 className="text-base font-medium text-neutral-900">
                {blog.title}
              </h3>
            </div>

            {/* Summary */}
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0">
              {blog.summary}
            </p>

            {/* Read link */}
            <Link
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-link mx-auto w-fit sm:mx-0"
            >
              Read article
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
