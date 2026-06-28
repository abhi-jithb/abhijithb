import type { Metadata } from "next";
import BlogSection from "@/components/sections/BlogSection";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read essays and notes by Abhijith B on learning, open source, and technology.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Abhijith B",
    description: "Essays and reflections on technology, open source, and learning.",
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
      <BlogSection posts={posts} />
    </main>
  );
}
