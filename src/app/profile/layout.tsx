import Link from "next/link";

const profileLinks = [
  { href: "/profile", label: "Overview" },
  { href: "/profile/skills", label: "Skills" },
  { href: "/profile/certifications", label: "Certifications" },
  { href: "/profile/experience", label: "Experience" },
  { href: "/profile/education", label: "Education" },
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <nav className="mb-8 flex flex-wrap gap-2.5" aria-label="Profile sections">
        {profileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-neutral-700 transition-colors hover:bg-black/5"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {children}
    </main>
  );
}
