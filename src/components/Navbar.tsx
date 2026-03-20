"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const effectiveSection = pathname === "/" ? activeSection : pathname.replace("/", "") || "home";

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

  const getLinkClass = (id: string) => {
    const baseClass =
      "rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40";
    const isActive = effectiveSection === id;

    return `${baseClass} ${isActive ? "font-medium text-black" : "text-neutral-700 hover:text-black"}`;
  };

  const isEventsRoute = pathname.startsWith("/events");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide text-black"
          onClick={() => setOpen(false)}
        >
          ABHIJITH
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {siteData.navItems.map((item) => (
            <Link
              key={item.id}
              href={item.id === "events" ? "/events" : `/#${item.id}`}
              className={
                item.id === "events"
                  ? `rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
                      isEventsRoute ? "font-medium text-black" : "text-neutral-700 hover:text-black"
                    }`
                  : getLinkClass(item.id)
              }
              aria-current={item.id === "events" ? (isEventsRoute ? "page" : undefined) : (effectiveSection === item.id ? "page" : undefined)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/profile"
            className={`rounded-sm text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 ${
              pathname.startsWith("/profile") ? "font-medium text-black" : "text-neutral-700 hover:text-black"
            }`}
            aria-current={pathname.startsWith("/profile") ? "page" : undefined}
          >
            Profile
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-black/20 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white md:hidden"
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
          {siteData.navItems.map((item) => (
            <Link
              key={item.id}
              href={item.id === "events" ? "/events" : `/#${item.id}`}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                item.id === "events"
                  ? isEventsRoute
                    ? "bg-black/5 font-medium text-black"
                    : "text-neutral-700 hover:bg-black/5 hover:text-black"
                  : effectiveSection === item.id
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
              pathname.startsWith("/profile")
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