import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import ReadingProgressBar from "@/components/features/blog/ReadingProgressBar";
import BlogReactions from "@/components/features/blog/BlogReactions";
import ShareButtons from "@/components/features/blog/ShareButtons";
import GiscusComments from "@/components/features/blog/GiscusComments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 60; // Enable ISR revalidation every 60 seconds

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithb.vercel.app";
  const seoTitle = post.seoTitle || post.title;
  const seoDesc = post.seoDescription || post.summary;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: `${seoTitle} | Abhijith B`,
      description: seoDesc,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt || post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get all posts for previous/next navigation
  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // JSON-LD Structured Data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithb.vercel.app";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.seoDescription || post.summary,
    "image": post.coverImage ? [post.coverImage.startsWith("http") ? post.coverImage : `${siteUrl}${post.coverImage}`] : [],
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "Abhijith B",
      "url": `${siteUrl}/about`
    },
    "publisher": {
      "@type": "Person",
      "name": "Abhijith B",
      "url": siteUrl
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`
    }
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgressBar readingTime={post.readingTime} />

      <main className="mx-auto w-full max-w-2xl px-5 py-12 sm:px-6 sm:py-16">
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
        <header className="mb-8 text-left">
          <div className="mb-4 flex flex-wrap items-center gap-2.5 text-xs text-neutral-500">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
            <span>•</span>
            <span className="rounded-full bg-neutral-900/10 px-2.5 py-0.5 text-neutral-800 font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl leading-tight">
            {post.title}
          </h1>

          {post.author && (
            <p className="text-xs text-neutral-500 mb-4">
              by <span className="font-semibold">{post.author}</span>
            </p>
          )}

          <p className="text-base leading-relaxed text-neutral-600 italic border-l-2 border-neutral-300 pl-4 mb-6">
            {post.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-neutral-500 bg-neutral-100/80 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Large Hero/Cover Image */}
        {post.coverImage && (
          <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm border border-neutral-200/50">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-102"
              sizes="(max-w-2xl) 100vw, 720px"
            />
          </div>
        )}

        {/* Divider */}
        <hr className="mb-8 border-neutral-200/60" />

        {/* Article Body */}
        <article
          className="blog-content mb-12"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
        />

        {/* Reaction Bar */}
        <BlogReactions postSlug={slug} />

        {/* Thanks Section */}
        <div className="text-center my-10 py-6 border-t border-b border-neutral-200/40">
          <p className="font-script text-2xl text-neutral-700 italic">
            Thank you for spending a little part of your day reading this.
          </p>
          <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-1.5">
            — {post.author || "Abhijith B"}
          </p>
        </div>

        {/* Social Sharing */}
        <ShareButtons postTitle={post.title} postSlug={slug} />

        {/* Previous / Next Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between items-stretch gap-4 my-10 pt-8 border-t border-neutral-200/60">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="paper-panel flex-1 p-4 rounded-xl hover:border-neutral-400 transition-all text-left flex flex-col justify-between group active:scale-98 cursor-pointer"
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Previous Post</span>
              <span className="font-medium text-xs sm:text-sm text-neutral-900 mt-1 line-clamp-1 group-hover:underline">{prevPost.title}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="paper-panel flex-1 p-4 rounded-xl hover:border-neutral-400 transition-all text-right flex flex-col justify-between group active:scale-98 cursor-pointer"
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">Next Post</span>
              <span className="font-medium text-xs sm:text-sm text-neutral-900 mt-1 line-clamp-1 group-hover:underline">{nextPost.title}</span>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </nav>

        {/* Giscus Comments */}
        <GiscusComments postSlug={slug} postTitle={post.title} />
      </main>
    </>
  );
}
