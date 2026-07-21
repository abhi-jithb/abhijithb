import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPosts } from "@/lib/blog";
import CategoryBlogSection from "@/components/sections/CategoryBlogSection";

interface PageProps {
  params: Promise<{ category: string }>;
}

interface CategoryConfig {
  name: string;
  icon: string;
  description: string;
}

const CATEGORIES_MAP: Record<string, CategoryConfig> = {
  self: {
    name: "Self",
    icon: "🌱",
    description: "Finding myself, personal growth, reflections, and life lessons.",
  },
  people: {
    name: "People",
    icon: "🫂",
    description: "Stories of humble human beings who left a trace in my life.",
  },
  tech: {
    name: "Tech",
    icon: "💻",
    description: "Exploring code, open source, developer tooling, and modern technologies.",
  },
  projects: {
    name: "Projects",
    icon: "🚀",
    description: "Case studies, startup launches, side projects, and building things from scratch.",
  },
  philosophy: {
    name: "Philosophy",
    icon: "🌌",
    description: "Deep thoughts, love, existence, and navigating life's unanswered questions.",
  },
  books: {
    name: "Books",
    icon: "📚",
    description: "Key takeaways, recommendations, and reviews of books that shaped my thinking.",
  },
};

export const dynamicParams = false; // Disable loading categories that are not defined below
export const revalidate = 60; // Enable ISR revalidation every 60 seconds

export async function generateStaticParams() {
  return Object.keys(CATEGORIES_MAP).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORIES_MAP[category.toLowerCase()];

  if (!config) {
    return {
      title: "Category Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithb.vercel.app";
  const title = `${config.name} Articles`;
  const description = config.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/blog/category/${category.toLowerCase()}`,
    },
    openGraph: {
      title: `${title} | Abhijith B`,
      description,
      url: `${siteUrl}/blog/category/${category.toLowerCase()}`,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${title} | Abhijith B`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryKey = category.toLowerCase();
  const config = CATEGORIES_MAP[categoryKey];

  if (!config) {
    notFound();
  }

  const allPosts = getBlogPosts();
  const categoryPosts = allPosts.filter(
    (post) => post.category.toLowerCase() === config.name.toLowerCase()
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithb.vercel.app";

  // Breadcrumb Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": config.name,
        "item": `${siteUrl}/blog/category/${categoryKey}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        <CategoryBlogSection
          categoryKey={categoryKey}
          categoryName={config.name}
          categoryIcon={config.icon}
          categoryDescription={config.description}
          posts={categoryPosts}
        />
      </main>
    </>
  );
}
