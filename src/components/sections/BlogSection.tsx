"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract all unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category)))];

  // Filter posts based on search and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Find the featured post (only if no active search/category filter)
  const isFiltering = searchQuery !== "" || selectedCategory !== "All";
  const featuredPost = !isFiltering ? posts.find((post) => post.featured) || posts[0] : null;
  
  // Remaining posts to show in the list
  const listPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20 sm:text-left">
      <p className="section-kicker mb-2">Notes from the workbench</p>
      <h2 className="section-title mb-6 sm:mb-8">Blog</h2>
      
      <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0 sm:mb-10 sm:text-base">
        A quiet space for sharing notes, ideas, and stories about building software, community, and learning.
      </p>

      {/* Search and Filters */}
      <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles, tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="paper-panel w-full rounded-full bg-white/70 px-5 py-2.5 text-sm text-neutral-900 placeholder-neutral-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 sm:max-w-xs"
        />

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3.5 py-1.5 text-xs transition-colors cursor-pointer ${
                selectedCategory === category
                  ? "bg-black text-white font-medium"
                  : "bg-white/50 text-neutral-700 border border-black/10 hover:bg-black/5 hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article */}
      {featuredPost && (
        <div className="paper-panel mb-12 rounded-2xl p-6 text-center transition-colors sm:mb-16 sm:p-8 sm:text-left">
          <div className="mb-3 flex items-center justify-center gap-2 text-xs sm:justify-start">
            <span className="font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Featured Article
            </span>
            <span className="text-neutral-300">•</span>
            <span className="rounded-full bg-neutral-900/10 px-2.5 py-0.5 text-neutral-800 font-medium">
              {featuredPost.category}
            </span>
          </div>

          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <h3 className="mb-3 text-xl font-semibold text-neutral-900 group-hover:text-black group-hover:underline sm:text-2xl">
              {featuredPost.title}
            </h3>
          </Link>
          
          <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0 sm:text-base">
            {featuredPost.summary}
          </p>

          <div className="mb-6 flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {featuredPost.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-neutral-500"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-500 sm:justify-start">
            <span>{featuredPost.date}</span>
            <span>•</span>
            <span>{featuredPost.readingTime} min read</span>
            <span>•</span>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="ink-link text-sm font-medium"
            >
              Read article
            </Link>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="space-y-10 sm:space-y-12">
        {listPosts.map((blog) => (
          <div key={blog.slug} className="flex flex-col gap-3">
            {/* Meta Line */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500 sm:justify-start">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.readingTime} min read</span>
              <span>•</span>
              <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-neutral-700">
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-neutral-900 sm:text-xl">
              <Link href={`/blog/${blog.slug}`} className="hover:underline">
                {blog.title}
              </Link>
            </h3>

            {/* Summary */}
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-700 sm:mx-0">
              {blog.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-neutral-500"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Read link */}
            <div className="mt-1 flex justify-center sm:justify-start">
              <Link
                href={`/blog/${blog.slug}`}
                className="ink-link"
              >
                Read article
              </Link>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="py-12">
            <p className="text-neutral-500">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
