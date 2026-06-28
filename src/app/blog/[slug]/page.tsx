import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Abhijith B Blog`,
      description: post.summary,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts (exclude current post, match category or tags)
  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.category === post.category) score += 3;
      const commonTags = p.tags.filter((tag) => post.tags.includes(tag));
      score += commonTags.length;
      return { post: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post)
    .slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="mb-8 sm:mb-10 text-center sm:text-left">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2.5 text-xs text-neutral-500 sm:justify-start">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readingTime} min read</span>
          <span>•</span>
          <span className="rounded-full bg-neutral-900/10 px-2.5 py-0.5 text-neutral-800 font-medium">
            {post.category}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl leading-tight">
          {post.title}
        </h1>

        <p className="text-base leading-relaxed text-neutral-700 italic">
          {post.summary}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-neutral-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* Divider */}
      <hr className="mb-8 border-neutral-300/80" />

      {/* Article Body */}
      <article
        className="blog-content mb-16"
        dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
      />

      {/* Divider */}
      <hr className="mb-10 border-neutral-300/80" />

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="mb-8">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
            Related Posts
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.slug}
                className="paper-panel rounded-2xl p-5 hover:border-black/30 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
                    <span>{relatedPost.date}</span>
                    <span>•</span>
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-neutral-700">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h4 className="mb-2 text-base font-semibold text-neutral-900">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:underline">
                      {relatedPost.title}
                    </Link>
                  </h4>
                  <p className="mb-4 text-xs text-neutral-700 line-clamp-2">
                    {relatedPost.summary}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.14em] text-neutral-800 hover:underline"
                  >
                    Read {"->"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
