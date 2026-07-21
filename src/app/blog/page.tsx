import type { Metadata } from "next";
import BlogCategoriesSection from "@/components/sections/BlogCategoriesSection";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog Categories",
  description: "Read essays and notes by Abhijith B categorized into Self, People, Tech, Projects, Philosophy, and Books.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Categories | Abhijith B",
    description: "Read essays and notes categorized into Self, People, Tech, Projects, Philosophy, and Books.",
    url: "/blog",
  },
};

export const revalidate = 60; // Enable ISR revalidation every 60 seconds

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
      <BlogCategoriesSection posts={posts} />
    </main>
  );
}
