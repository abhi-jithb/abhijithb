"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/lib/data";

type MergedNavItem = {
  id: string;
  label: string;
  href: string;
  sectionIds: string[];
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const effectiveSection = pathname === "/" ? activeSection : pathname.replace("/", "") || "home";
  const mergedNavItems: MergedNavItem[] = [
    { id: "home", label: "Home", href: "/#home", sectionIds: ["home"] },
    { id: "about", label: "About", href: "/#about", sectionIds: ["about"] },
    { id: "work", label: "Work", href: "/#projects", sectionIds: ["projects", "events"] },
    { id: "updates", label: "Updates", href: "/#blog", sectionIds: ["blog", "releases"] },
    { id: "contact", label: "Contact", href: "/#contact", sectionIds: ["contact"] },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = siteData.navItems
      .map((item) => document.getElementById(item.id))
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

  const isMergedItemActive = (item: MergedNavItem) => {
    if (item.id === "work") {
      return item.sectionIds.includes(effectiveSection) || pathname.startsWith("/events") || pathname.startsWith("/hackathons");
    }

    if (item.id === "updates") {
      return item.sectionIds.includes(effectiveSection) || pathname.startsWith("/blog") || pathname.startsWith("/releases");
    }

    return item.sectionIds.includes(effectiveSection);
  };

  const getLinkClass = (item: MergedNavItem) => {
    const baseClass =
      "rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30";
    const isActive = isMergedItemActive(item);

    return `${baseClass} ${isActive ? "bg-black/10 text-black" : "text-neutral-700 hover:bg-black/5 hover:text-black"}`;
  };

  const isProfileRoute = pathname.startsWith("/profile");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[var(--surface-strong)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-script text-2xl leading-none text-black"
          onClick={() => setOpen(false)}
        >
          Abhijith
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {mergedNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={getLinkClass(item)}
              aria-current={isMergedItemActive(item) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/profile"
            className={`rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 ${
              isProfileRoute ? "bg-black/10 text-black" : "text-neutral-700 hover:bg-black/5 hover:text-black"
            }`}
            aria-current={isProfileRoute ? "page" : undefined}
          >
            Profile
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-black/20 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-5 pb-4 md:hidden"
          aria-label="Mobile primary"
        >
          {mergedNavItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                isMergedItemActive(item)
                  ? "bg-black/5 font-medium text-black"
                  : "text-neutral-700 hover:bg-black/5 hover:text-black"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/profile"
            className={`rounded-md px-3 py-2 text-sm transition-colors ${
              isProfileRoute
                ? "bg-black/5 font-medium text-black"
                : "text-neutral-700 hover:bg-black/5 hover:text-black"
            }`}
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
        </nav>
      ) : null}
    </header>
  );
}