"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/lib/data";

const AboutIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
      transition={{ duration: 0.5 }}
    >
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path d="M9 10h.01" strokeWidth="2.5" />
      <path d="M15 10h.01" strokeWidth="2.5" />
      <path d="M8 14.5c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" />
    </motion.svg>
  </span>
);

const BlogIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      whileHover="hover"
    >
      <path d="M6 3h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M4 6h-2M4 11h-2M4 16h-2" />
      <path d="M8 8h6" />
      <motion.path
        d="M8 12h8"
        variants={{
          initial: { pathLength: 0 },
          hover: { pathLength: 1 },
        }}
        initial="initial"
        transition={{ duration: 0.3 }}
      />
      <path d="M8 16h6" />
    </motion.svg>
  </span>
);

const ProjectsIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 450, damping: 10 } }}
    >
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
      <path d="M16 7V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2" />
    </motion.svg>
  </span>
);

const ContactIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full overflow-visible"
      whileHover="hover"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="M22 6l-10 7L2 6" />
      <motion.path
        d="M12 16.5c-1.5-1.5-2.5-2.2-2.5-3.3 0-1 0.7-1.7 1.7-1.7.6 0 1.2.4 1.5.8.3-.4.9-.8 1.5-.8 1 0 1.7.7 1.7 1.7 0 1.1-1 1.8-2.5 3.3z"
        fill="#f43f5e"
        stroke="#f43f5e"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.35 },
        }}
        initial="initial"
        transition={{ type: "spring", stiffness: 450, damping: 8 }}
        style={{ transformOrigin: "12px 14px" }}
      />
    </motion.svg>
  </span>
);

const ProfileIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <span className={`inline-flex items-center justify-center ${className}`}>
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full overflow-visible"
      whileHover="hover"
    >
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.path
        d="M19 3c.3.8.8 1.3 1.6 1.6-.8.3-1.3.8-1.6 1.6-.3-.8-.8-1.3-1.6-1.6.8-.3 1.3-.8 1.6-1.6z"
        fill="currentColor"
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.4, rotate: 45 },
        }}
        initial="initial"
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        style={{ transformOrigin: "19px 4.6px" }}
      />
    </motion.svg>
  </span>
);

const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  about: AboutIcon,
  blog: BlogIcon,
  projects: ProjectsIcon,
  contact: ContactIcon,
  profile: ProfileIcon,
};

const MenuGridIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-black"
  >
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="12" cy="6" r="2.2" />
    <circle cx="18" cy="6" r="2.2" />
    <circle cx="6" cy="12" r="2.2" />
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="18" cy="12" r="2.2" />
    <circle cx="6" cy="18" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <circle cx="18" cy="18" r="2.2" />
  </svg>
);

const MenuCloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-black"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

type MergedNavItem = {
  id: string;
  label: string;
  href: string;
  sectionIds: string[];
};

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Normalize pathname to identify active section
  const getEffectiveSection = () => {
    if (pathname === "/") return activeSection;
    if (pathname.startsWith("/about")) return "about";
    if (pathname.startsWith("/blog") || pathname.startsWith("/releases")) return "blog";
    if (pathname.startsWith("/projects") || pathname.startsWith("/events") || pathname.startsWith("/hackathons")) return "projects";
    if (pathname.startsWith("/contact")) return "contact";
    if (pathname.startsWith("/profile")) return "profile";
    return "home";
  };
  
  const effectiveSection = getEffectiveSection();
  
  // Navigation items: About, Blog, Projects, Contact, Profile (order left to right)
  const mergedNavItems: MergedNavItem[] = [
    { id: "about", label: "About", href: "/about", sectionIds: ["about"] },
    { id: "blog", label: "Blog", href: "/blog", sectionIds: ["blog", "releases"] },
    { id: "projects", label: "Projects", href: "/projects", sectionIds: ["projects", "events"] },
    { id: "contact", label: "Contact", href: "/contact", sectionIds: ["contact"] },
    { id: "profile", label: "Profile", href: "/profile", sectionIds: ["profile"] },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = ["home"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.2, 0.5, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  // Hide floating sidebar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setSidebarVisible(false);
        setSidebarOpen(false); // Collapse floating menu on scroll down
      } else if (currentScrollY < lastScrollY) {
        setSidebarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isMergedItemActive = (item: MergedNavItem) => {
    if (item.id === "projects") {
      return item.sectionIds.includes(effectiveSection) || pathname.startsWith("/events") || pathname.startsWith("/hackathons");
    }

    if (item.id === "blog") {
      return item.sectionIds.includes(effectiveSection) || pathname.startsWith("/blog") || pathname.startsWith("/releases");
    }

    return item.sectionIds.includes(effectiveSection);
  };

  const getLinkClass = (item: MergedNavItem) => {
    const baseClass =
      "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30";
    const isActive = isMergedItemActive(item);

    return `${baseClass} ${isActive ? "bg-black/10 text-black font-semibold" : "text-neutral-700 hover:bg-black/5 hover:text-black"}`;
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-[var(--surface-strong)] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
          {/* Logo acts as Home */}
          <Link
            href="/"
            className="font-script text-2xl leading-none text-black"
            onClick={() => setSidebarOpen(false)}
          >
            Abhijith B
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary">
            {mergedNavItems.map((item) => {
              const Icon = navIcons[item.id];
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={getLinkClass(item)}
                  aria-current={isMergedItemActive(item) ? "page" : undefined}
                >
                  {Icon && <Icon className="w-4.5 h-4.5 mr-1" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Floating Sidebar (Right Side Floating Menu) */}
      <div className="md:hidden">
        {/* Tap-outside Backdrop */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px]"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar Container */}
        <div
          className={`fixed right-5 bottom-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ${
            sidebarVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              /* Expanded Menu */
              <motion.div
                key="expanded-sidebar"
                initial={{ scale: 0.85, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 40 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="paper-panel flex flex-col gap-2 min-w-[145px] border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur-md rounded-[2.2rem]"
              >
                {/* Close Button Inside Expanded Menu at the top */}
                <div className="flex justify-between items-center px-2 pb-1 border-b border-black/5 mb-1">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Navigate</span>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
                  >
                    <MenuCloseIcon />
                  </button>
                </div>
                {mergedNavItems.map((item) => {
                  const Icon = navIcons[item.id];
                  const isActive = isMergedItemActive(item);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-full px-3.5 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-black/10 text-black font-semibold"
                          : "text-neutral-700 hover:bg-black/5 active:bg-black/10"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {Icon && <Icon className="w-5 h-5 mr-0.5" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            ) : (
              /* Collapsed Button Trigger */
              <motion.button
                key="collapsed-trigger"
                type="button"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(true)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 border border-black/10 shadow-lg backdrop-blur-md cursor-pointer hover:bg-neutral-50 active:bg-neutral-100"
                aria-label="Open navigation menu"
              >
                <MenuGridIcon />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}