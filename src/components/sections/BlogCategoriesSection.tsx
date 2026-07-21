"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog";

interface BlogCategoriesSectionProps {
  posts: BlogPost[];
}

interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
  gradient: string;
  glow: string;
  borderColor: string;
}

const CATEGORIES: CategoryInfo[] = [
  {
    id: "self",
    name: "Self",
    icon: "🌱",
    description: "Finding myself, personal growth, reflections, and life lessons.",
    gradient: "from-emerald-500/12 via-teal-500/6 to-transparent",
    glow: "hover:shadow-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-500/[0.02]",
    borderColor: "border-emerald-500/10",
  },
  {
    id: "people",
    name: "People",
    icon: "🫂",
    description: "Stories of humble human beings who left a trace in my life.",
    gradient: "from-rose-500/12 via-orange-500/6 to-transparent",
    glow: "hover:shadow-rose-500/15 hover:border-rose-400/50 hover:bg-rose-500/[0.02]",
    borderColor: "border-rose-500/10",
  },
  {
    id: "tech",
    name: "Tech",
    icon: "💻",
    description: "Exploring code, open source, developer tooling, and modern technologies.",
    gradient: "from-blue-500/12 via-indigo-500/6 to-transparent",
    glow: "hover:shadow-blue-500/15 hover:border-blue-400/50 hover:bg-blue-500/[0.02]",
    borderColor: "border-blue-500/10",
  },
  {
    id: "projects",
    name: "Projects",
    icon: "🚀",
    description: "Case studies, startup launches, side projects, and building things from scratch.",
    gradient: "from-violet-500/12 via-purple-500/6 to-transparent",
    glow: "hover:shadow-violet-500/15 hover:border-violet-400/50 hover:bg-violet-500/[0.02]",
    borderColor: "border-violet-500/10",
  },
  {
    id: "philosophy",
    name: "Philosophy",
    icon: "🌌",
    description: "Deep thoughts, love, existence, and navigating life's unanswered questions.",
    gradient: "from-amber-500/12 via-rose-500/6 to-transparent",
    glow: "hover:shadow-amber-500/15 hover:border-amber-400/50 hover:bg-amber-500/[0.02]",
    borderColor: "border-amber-500/10",
  },
  {
    id: "books",
    name: "Books",
    icon: "📚",
    description: "Key takeaways, recommendations, and reviews of books that shaped my thinking.",
    gradient: "from-yellow-600/12 via-amber-500/6 to-transparent",
    glow: "hover:shadow-yellow-500/15 hover:border-yellow-400/50 hover:bg-yellow-600/[0.02]",
    borderColor: "border-yellow-500/10",
  },
];

export default function BlogCategoriesSection({ posts }: BlogCategoriesSectionProps) {
  const getPostCount = (categoryName: string) => {
    return posts.filter((post) => post.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  // Stagger variants for grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.15,
      y: -4,
      rotate: [0, -6, 6, 0],
      transition: {
        duration: 0.45,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:py-12">
      {/* Title Header */}
      <div className="mb-10 text-center sm:text-left">
        <p className="section-kicker mb-2">Notes from the workbench</p>
        <h2 className="section-title mb-4">Blog Categories</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Dive into specific streams of thoughts. Pick a category below to explore reflections, technical notes, startup updates, and literary takeaways.
        </p>
      </div>

      {/* Grid of Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {CATEGORIES.map((category) => {
          const count = getPostCount(category.id);
          return (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover="hover"
              className="flex"
            >
              <Link
                href={`/blog/category/${category.id}`}
                className={`paper-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-out border ${category.borderColor} ${category.glow} hover:-translate-y-1.5 hover:shadow-lg active:scale-98`}
                aria-label={`Explore category ${category.name} containing ${count} articles`}
              >
                {/* Background Gradient & Light Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-60`}
                />
                
                {/* Subtle Radial Glow on Hover */}
                <div className="absolute -inset-px rounded-2xl bg-radial from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Category Icon */}
                  <motion.div
                    variants={iconVariants}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/70 text-2xl shadow-sm border border-neutral-200/40 backdrop-blur-sm"
                  >
                    {category.icon}
                  </motion.div>

                  {/* Category Name */}
                  <h3 className="mb-2 text-lg font-bold text-neutral-900 leading-tight">
                    {category.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed min-h-[48px]">
                    {category.description}
                  </p>
                </div>

                {/* Article Count / Preview feeling */}
                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-neutral-200/30 pt-4">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    {count} {count === 1 ? "Article" : "Articles"}
                  </span>
                  
                  {/* Arrow Indicator */}
                  <span className="text-xs font-semibold text-neutral-500 transition-transform duration-300 group-hover:translate-x-1.5">
                    Explore →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
