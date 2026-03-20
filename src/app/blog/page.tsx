import type { Metadata } from "next";
import  BlogSection  from "@/components/sections/BlogSection";

export const metadata: Metadata = {
  title: "Writing",
  description: "Read essays and notes by Abhijith B on learning and technology.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Writing | Abhijith B",
    description: "Essays and reflections on technology and learning.",
    url: "/blog",
  },
};

export default function BlogPage() {
  return <BlogSection />;
}
