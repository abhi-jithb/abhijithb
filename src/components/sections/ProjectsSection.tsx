"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { RankedGitHubProject } from "@/lib/github";
import { FaGithub, FaExternalLinkAlt, FaBook, FaStar } from "react-icons/fa";
import { GoGitCommit } from "react-icons/go";

interface ProjectsSectionProps {
  initialProjects: RankedGitHubProject[];
}

interface ProjectMetadata {
  name: string; // matches repository name (case-insensitive)
  displayName: string;
  icon: string;
  gradient: string;
  glow: string;
  borderColor: string;
  status: "Completed" | "In Progress" | "Archived";
  techStack: string[];
  liveDemoUrl?: string;
  documentationUrl?: string;
  featured?: boolean;
}

const PROJECT_METADATA: Record<string, ProjectMetadata> = {
  "thalavedana": {
    name: "thalavedana",
    displayName: "Thalavedana",
    icon: "📊",
    gradient: "from-amber-500/12 via-orange-500/6 to-transparent",
    glow: "hover:shadow-amber-500/15 hover:border-amber-400/50 hover:bg-amber-500/[0.02]",
    borderColor: "border-amber-500/10",
    status: "Completed",
    techStack: ["Node.js", "SQLite", "Google Sheets API", "Gmail API"],
    featured: true,
    documentationUrl: "https://github.com/abhi-jithb/Thalavedana#readme",
  },
  "the-untold-amor": {
    name: "the-untold-amor",
    displayName: "The Untold Amor",
    icon: "💖",
    gradient: "from-rose-500/12 via-pink-500/6 to-transparent",
    glow: "hover:shadow-rose-500/15 hover:border-rose-400/50 hover:bg-rose-500/[0.02]",
    borderColor: "border-rose-500/10",
    status: "In Progress",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase"],
    featured: true,
    liveDemoUrl: "https://the-untold-amor.vercel.app",
  },
  "easyresumemaker": {
    name: "easyresumemaker",
    displayName: "Easy Resume Maker",
    icon: "📄",
    gradient: "from-blue-500/12 via-indigo-500/6 to-transparent",
    glow: "hover:shadow-blue-500/15 hover:border-blue-400/50 hover:bg-blue-500/[0.02]",
    borderColor: "border-blue-500/10",
    status: "Completed",
    techStack: ["React", "CSS Modules", "HTML5", "Local Storage"],
    liveDemoUrl: "https://easy-resume-maker.vercel.app",
  },
  "knockout-boxing-club": {
    name: "knockout-boxing-club",
    displayName: "Knockout Boxing Club",
    icon: "🥊",
    gradient: "from-red-500/12 via-rose-500/6 to-transparent",
    glow: "hover:shadow-red-500/15 hover:border-red-400/50 hover:bg-red-500/[0.02]",
    borderColor: "border-red-500/10",
    status: "Completed",
    techStack: ["HTML5", "Vanilla CSS", "JavaScript", "Netlify Forms"],
    liveDemoUrl: "https://knockoutboxingclub.com",
  },
  "spotify-clone": {
    name: "spotify-clone",
    displayName: "Spotify Clone",
    icon: "🎵",
    gradient: "from-emerald-500/12 via-teal-500/6 to-transparent",
    glow: "hover:shadow-emerald-500/15 hover:border-emerald-400/50 hover:bg-emerald-500/[0.02]",
    borderColor: "border-emerald-500/10",
    status: "Completed",
    techStack: ["React", "Spotify Web API", "Tailwind CSS"],
  },
  "abhijithb": {
    name: "abhijithb",
    displayName: "Portfolio Site",
    icon: "🌱",
    gradient: "from-violet-500/12 via-purple-500/6 to-transparent",
    glow: "hover:shadow-violet-500/15 hover:border-violet-400/50 hover:bg-violet-500/[0.02]",
    borderColor: "border-violet-500/10",
    status: "In Progress",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: true,
  }
};

const getFallbackMetadata = (name: string): ProjectMetadata => {
  const cleanName = name.replace(/-/g, " ");
  const displayName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  return {
    name: name.toLowerCase(),
    displayName,
    icon: "🚀",
    gradient: "from-neutral-500/12 via-neutral-400/6 to-transparent",
    glow: "hover:shadow-neutral-500/15 hover:border-neutral-400/50 hover:bg-neutral-500/[0.02]",
    borderColor: "border-neutral-500/10",
    status: "Completed",
    techStack: ["GitHub", "Software"],
  };
};

export default function ProjectsSection({ initialProjects }: ProjectsSectionProps) {
  // Stagger entrance animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
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

  const iconVariants: Variants = {
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
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-20">
      {/* Title Header */}
      <div className="mb-10 text-center sm:text-left">
        <p className="section-kicker mb-2">Things I shipped</p>
        <h2 className="section-title mb-4">Projects</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          Every project here started as something I built for fun, curiosity, and real-world tinkering.
        </p>
      </div>

      {/* Grid of Projects */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {initialProjects.map((project) => {
          const meta = PROJECT_METADATA[project.name.toLowerCase()] || getFallbackMetadata(project.name);
          const techList = meta.techStack.length > 0 ? meta.techStack : project.languages;

          return (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover="hover"
              className="flex"
            >
              <div
                className={`paper-panel group relative flex w-full flex-col justify-between overflow-hidden rounded-2xl transition-all duration-300 ease-out border ${meta.borderColor} ${meta.glow} hover:-translate-y-1.5 hover:shadow-lg h-full`}
              >
                {/* Upper visual banner section */}
                <div className="relative h-32 w-full overflow-hidden border-b border-neutral-200/50 bg-neutral-50 flex items-center justify-center select-none">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-50 transition-opacity duration-300 group-hover:opacity-75`}
                  />
                  
                  {/* Subtle Radial Glow */}
                  <div className="absolute -inset-px bg-radial from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border shadow-sm ${
                      meta.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/10"
                        : meta.status === "In Progress"
                        ? "bg-blue-500/10 text-blue-700 border-blue-500/10"
                        : "bg-neutral-500/10 text-neutral-700 border-neutral-500/10"
                    }`}
                  >
                    {meta.status}
                  </span>

                  {/* Optional Featured Badge */}
                  {meta.featured && (
                    <span className="absolute top-3 left-3 text-[9px] uppercase font-bold tracking-widest bg-neutral-900 text-white px-2 py-0.5 rounded shadow-sm">
                      ★ Featured
                    </span>
                  )}

                  {/* Floating Icon bubble */}
                  <motion.div
                    variants={iconVariants}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-3xl shadow-md border border-neutral-200/50 backdrop-blur-sm"
                  >
                    {meta.icon}
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Name */}
                    <h3 className="mb-2 text-base font-bold text-neutral-900 leading-tight">
                      {meta.displayName}
                    </h3>

                    {/* Stats bar */}
                    <div className="mb-3 flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <FaStar size={11} className="text-amber-500/90" />
                        {project.stars}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <GoGitCommit size={13} className="text-neutral-400" />
                        {project.commits} commits
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 h-15 overflow-hidden mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack & Actions Area */}
                  <div>
                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {techList.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium text-neutral-500 bg-neutral-950/5 border border-neutral-950/5 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-neutral-100">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                        title="View GitHub Repository"
                      >
                        <FaGithub size={13} />
                        Code
                      </Link>

                      {meta.liveDemoUrl && (
                        <Link
                          href={meta.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                          title="View Live Demo"
                        >
                          <FaExternalLinkAlt size={11} />
                          Live Demo
                        </Link>
                      )}

                      {meta.documentationUrl && (
                        <Link
                          href={meta.documentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black transition-colors"
                          title="View Documentation"
                        >
                          <FaBook size={11} />
                          Docs
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {initialProjects.length === 0 && (
        <p className="text-center py-12 text-sm text-neutral-500">
          Live project data is temporarily unavailable. Please check again shortly.
        </p>
      )}
    </div>
  );
}
