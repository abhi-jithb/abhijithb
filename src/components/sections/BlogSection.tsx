"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/date";

interface BlogSectionProps {
  posts: BlogPost[];
}

type SortOption = "newest" | "oldest" | "featured";

export default function BlogSection({ posts }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Extract all unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];

  // Filter posts based on search and category
  let filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort posts
  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "featured") {
      // Show featured posts first, then newest
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    // Default newest
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      {/* Title Header */}
      <div className="mb-10 text-center sm:text-left">
        <p className="section-kicker mb-2">Notes from the workbench</p>
        <h2 className="section-title mb-4">Blog</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          A quiet space for sharing notes, ideas, and stories about building software, open source, and design.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col gap-5 border-b border-neutral-200/50 pb-8">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search articles, tags, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-10 text-sm text-neutral-900 shadow-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
          />
          <span className="absolute left-3.5 top-3.5 text-neutral-400 text-sm select-none">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3.5 text-neutral-400 hover:text-black text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Controls Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Categories Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-3.5 py-1.5 text-xs transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-neutral-900 text-white font-medium shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 shadow-sm focus:border-neutral-400 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="featured">Featured first</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {filteredPosts.map((blog) => (
          <article
            key={blog.slug}
            className={`paper-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300/80 ${
              blog.featured ? "sm:col-span-2 border-neutral-300" : "border-neutral-200/60"
            }`}
          >
            {/* Cute Accent for Featured Posts */}
            {blog.featured && (
              <div className="absolute top-0 left-0 w-full h-[3px] bg-neutral-900" />
            )}

            <div>
              {/* Cover Image */}
              {blog.coverImage ? (
                <Link href={`/blog/${blog.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden border-b border-neutral-200/50 bg-neutral-100">
                  <Image
                    src={blog.coverImage}
                    alt={blog.coverImageAlt || blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes={blog.featured ? "(max-w-4xl) 100vw, 860px" : "(max-w-2xl) 100vw, 420px"}
                  />
                </Link>
              ) : (
                <div className="relative aspect-[16/9] w-full border-b border-neutral-200/50 bg-neutral-50 flex items-center justify-center select-none text-4xl">
                  📝
                </div>
              )}

              {/* Content area */}
              <div className="p-6">
                {/* Meta details */}
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                  <span className="rounded-full bg-neutral-900/5 px-2.5 py-0.5 font-medium text-neutral-700">
                    {blog.category}
                  </span>
                  <span>•</span>
                  <span>{formatDate(blog.date)}</span>
                  <span>•</span>
                  <span>{blog.readingTime} min read</span>
                  {blog.featured && (
                    <>
                      <span>•</span>
                      <span className="text-neutral-900 font-semibold uppercase tracking-wider text-[9px]">
                        ★ Featured
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-bold text-neutral-900 group-hover:text-black group-hover:underline sm:text-xl leading-snug">
                  <Link href={`/blog/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="mb-4 text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                  {blog.summary}
                </p>
              </div>
            </div>

            {/* Bottom details (Tags + Read link) */}
            <div className="px-6 pb-6 pt-0 border-t border-neutral-100/50 mt-auto flex flex-col gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="ink-link text-xs"
                >
                  Read article
                </Link>
              </div>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center sm:col-span-2">
            <span className="text-3xl">🏜️</span>
            <p className="mt-3 text-sm text-neutral-500">No articles match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
