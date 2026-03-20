"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Writing" },
  { id: "releases", label: "Releases" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-sm text-neutral-700 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 rounded-sm";

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
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={linkClass}
              aria-current={pathname === "/" && item.id === "home" ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
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
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className="rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-black/5 hover:text-black"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}