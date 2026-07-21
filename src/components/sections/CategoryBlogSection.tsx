"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/date";

interface CategoryBlogSectionProps {
  categoryKey: string;
  categoryName: string;
  categoryIcon: string;
  categoryDescription: string;
  posts: BlogPost[];
}

type SortOption = "newest" | "oldest" | "featured";

const POSTS_PER_PAGE = 6;

export default function CategoryBlogSection({
  categoryKey,
  categoryName,
  categoryIcon,
  categoryDescription,
  posts,
}: CategoryBlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Get all unique tags present in posts of *this* category
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag.toLowerCase()));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // 2. Filter posts based on search query and tag selection
  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesTag =
        !selectedTag || post.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });

    // Sort posts
    return result.sort((a, b) => {
      if (sortBy === "featured") {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      // Default: newest
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [posts, searchQuery, selectedTag, sortBy]);

  // 3. Paginate the filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back to Categories
        </Link>
      </div>

      {/* Category Header */}
      <div className="mb-10 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6 pb-8 border-b border-neutral-200/50">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-4xl shadow-md border border-neutral-200/30 backdrop-blur-sm shrink-0">
          {categoryIcon}
        </div>
        <div>
          <h2 className="section-title mb-2 flex items-center justify-center sm:justify-start gap-3">
            {categoryName}
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest bg-neutral-900/5 px-2.5 py-0.5 rounded-full">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            {categoryDescription}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col gap-5">
        {/* Search & Sort Row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder={`Search in ${categoryName}...`}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              aria-label={`Search articles in ${categoryName}`}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 pl-10 text-sm text-neutral-900 shadow-sm placeholder-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
            <span className="absolute left-3.5 top-3.5 text-neutral-400 text-sm select-none">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                aria-label="Clear search query"
                className="absolute right-3 top-3.5 text-neutral-400 hover:text-black text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs text-neutral-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              aria-label="Sort articles"
              className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 shadow-sm focus:border-neutral-400 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="featured">Featured first</option>
            </select>
          </div>
        </div>

        {/* Dynamic Tags Row */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mr-1">
              Filter by Tag:
            </span>
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  aria-pressed={isSelected}
                  aria-label={`Filter by tag ${tag}`}
                  className={`rounded-lg px-3 py-1 text-xs transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white font-medium shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </d      {/* Blog Cards Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((blog) => (
          <article
            key={blog.slug}
            className={`paper-panel group relative flex flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-neutral-300/80 h-full ${
              blog.featured ? "md:col-span-2 lg:col-span-2 border-neutral-300" : "border-neutral-200/60"
            }`}
          >
            {/* Featured Post Indicator */}
            {blog.featured && (
              <div className="absolute top-0 left-0 w-full h-[3px] bg-neutral-900" />
            )}

            <div className="flex flex-col flex-grow">
              {/* Cover Image */}
              {blog.coverImage ? (
                <Link
                  href={`/blog/${blog.slug}`}
                  className="relative block aspect-[16/9] w-full overflow-hidden border-b border-neutral-200/50 bg-neutral-100"
                >
                  <Image
                    src={blog.coverImage}
                    alt={blog.coverImageAlt || blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-102"
                    sizes={blog.featured ? "(max-w-4xl) 100vw, 600px" : "(max-w-2xl) 100vw, 300px"}
                  />
                </Link>
              ) : (
                <div className="relative aspect-[16/9] w-full border-b border-neutral-200/50 bg-neutral-50 flex items-center justify-center select-none text-4xl">
                  📝
                </div>
              )}

              {/* Content Area */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta Details */}
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
                <h3 className="mb-2 text-lg font-bold text-neutral-900 group-hover:text-black group-hover:underline sm:text-xl leading-snug line-clamp-2 h-14 overflow-hidden">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>

                {/* Summary */}
                <p className="mb-4 text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed flex-grow">
                  {blog.summary}
                </p>
              </div>
            </div>

            {/* Bottom details (Tags + Read link) */}
            <div className="px-6 pb-6 pt-0 border-t border-neutral-100/50 flex flex-col gap-4 mt-auto">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4">
                {blog.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    aria-pressed={selectedTag === tag}
                    aria-label={`Toggle tag ${tag}`}
                    className={`text-[11px] hover:underline transition-colors ${
                      selectedTag === tag ? "text-neutral-900 font-bold" : "text-neutral-400 hover:text-neutral-700"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between">
                <Link href={`/blog/${blog.slug}`} className="ink-link text-xs">
                  Read article
                </Link>
              </div>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-16 text-center sm:col-span-2">
            <span className="text-3xl">🏜️</span>
            <p className="mt-3 text-sm text-neutral-500">No articles match your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2 border-t border-neutral-200/50 pt-8" role="navigation" aria-label="Pagination Navigation">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className="rounded-lg border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-white disabled:pointer-events-none cursor-pointer"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={currentPage === pageNum ? "page" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className="rounded-lg border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 disabled:opacity-50 disabled:hover:bg-white disabled:pointer-events-none cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
