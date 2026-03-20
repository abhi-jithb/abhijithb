import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
import { siteData } from "@/lib/data";

const socialIcons = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  substack: SiSubstack,
};

export default function HomeSection() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-24">
      <p className="section-kicker mb-4">Building in public</p>

      {/* Profile Image */}
      <div className="paper-panel mb-7 rounded-[2rem] p-3 sm:mb-8">
        <Image
          src={siteData.profileImage}
          alt={siteData.name}
          width={176}
          height={176}
          sizes="(max-width: 640px) 160px, 176px"
          quality={85}
          className="h-40 w-40 rounded-full object-cover ring-2 ring-black/10 sm:h-44 sm:w-44"
          priority
        />
      </div>

      {/* Name */}
      <h1 className="section-title mb-3 text-neutral-900 sm:text-5xl">
        {siteData.name}
      </h1>

      {/* One-liner */}
      <p className="mb-8 max-w-xl text-sm leading-relaxed text-neutral-700 sm:mb-10 sm:text-base">
        {siteData.heroLine}
      </p>

      <p className="mb-6 text-xs uppercase tracking-[0.14em] text-neutral-500 sm:text-sm">
        {siteData.role} - {siteData.location}
      </p>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5 sm:mb-10 sm:gap-3">
        {siteData.stats.map((stat) => (
          <span
            key={stat.label}
            className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-neutral-700"
          >
            {stat.label}: {stat.value}
          </span>
        ))}
      </div>

      {/* Social Icons */}
      <div className="mb-8 flex items-center gap-7 sm:mb-10 sm:gap-8">
        {siteData.socialLinks.map((socialLink) => {
          const Icon = socialIcons[socialLink.id];

          return (
            <Link
              key={socialLink.id}
              href={socialLink.url}
              target="_blank"
              aria-label={socialLink.label}
              rel="noopener noreferrer"
              className="text-black transition-transform transition-colors hover:-translate-y-0.5 hover:text-neutral-600"
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </div>

      {/* Resume Button */}
      <Link
        href={siteData.resumePath}
        className="inline-flex items-center rounded-full border border-black px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
      >
        Download Resume
      </Link>
    </div>
  );
}
