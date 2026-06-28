"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <div className="mx-auto flex h-full min-h-[calc(100dvh-4rem)] w-full max-w-4xl flex-col items-center justify-center gap-8 px-5 py-6 md:flex-row md:justify-between md:gap-12 md:text-left sm:px-8">
      
      {/* Left Column: Text Content */}
      <div className="flex flex-col items-center text-center md:max-w-xl md:items-start md:text-left">
        <p className="section-kicker mb-2">Building in public</p>

        {/* Name */}
        <h1 className="section-title mb-4 text-neutral-900 sm:text-5xl sm:leading-[1.1]">
          {siteData.name}
        </h1>

        {/* One-liner */}
        <p className="mb-6 max-w-lg text-sm leading-relaxed text-neutral-700 sm:text-base md:mb-8">
          {siteData.heroLine}
        </p>

        {/* Role & Location */}
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 sm:text-sm">
          {siteData.role} <span className="mx-1.5 text-neutral-300">•</span> {siteData.location}
        </p>

        {/* Stats Badges */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:justify-start">
          {siteData.stats.map((stat) => (
            <span
              key={stat.label}
              className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-neutral-700 shadow-sm"
            >
              {stat.label}: {stat.value}
            </span>
          ))}
        </div>

        {/* Social Icons */}
        <div className="mb-8 flex items-center justify-center gap-7 md:justify-start md:mb-10 sm:gap-8">
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
                <Icon size={22} />
              </Link>
            );
          })}
        </div>

        {/* Resume Button */}
        <div className="flex justify-center md:justify-start">
          <Link
            href={siteData.resumePath}
            className="inline-flex items-center rounded-full border border-black px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white"
          >
            Download Resume
          </Link>
        </div>
      </div>

      {/* Right Column: Profile Image Card */}
      <motion.div
        className="flex-shrink-0"
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <div className="paper-panel relative h-60 w-44 overflow-hidden rounded-[2.2rem] bg-[#fbfbfa] p-0 shadow-lg sm:h-76 sm:w-56 border border-black/10">
          {/* Layered Warm Creative Background Shapes */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#fefbf6] via-[#f7f6f1] to-[#eae8df] pointer-events-none" />
          
          {/* Soft Colored Bubbles */}
          <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-orange-100/50 blur-xl pointer-events-none" />
          <div className="absolute -right-8 top-12 w-32 h-32 rounded-full bg-amber-100/60 blur-xl pointer-events-none" />
          <div className="absolute left-4 bottom-4 w-28 h-28 rounded-full bg-neutral-200/50 blur-xl pointer-events-none" />
          <div className="absolute right-6 bottom-12 w-20 h-20 rounded-full bg-orange-50/40 blur-lg pointer-events-none" />
          
          {/* Soft Hand-drawn Doodles / Sparkles / Dots */}
          <svg className="absolute inset-0 w-full h-full text-black/5 pointer-events-none" stroke="currentColor" fill="none" strokeWidth="1.5">
            {/* Wobbly circle texture */}
            <path d="M 40,60 C 50,30 90,20 110,40 C 130,60 120,100 100,120 C 80,140 30,120 40,60 Z" strokeDasharray="3,3" />
            <path d="M 120,180 C 130,160 160,150 170,170 C 180,190 170,210 150,220 C 130,230 110,210 120,180 Z" strokeDasharray="3,3" />
            
            {/* Small sparkles */}
            <path d="M190,40 c0,4 2,6 6,6 c-4,0 -6,2 -6,6 c0,-4 -2,-6 -6,-6 c4,0 6,-2 6,-6 z" fill="currentColor" stroke="none" />
            <path d="M30,180 c0,3 1.5,4.5 4.5,4.5 c-3,0 -4.5,1.5 -4.5,4.5 c0,-3 -1.5,-4.5 -4.5,-4.5 c3,0 4.5,-1.5 4.5,-4.5 z" fill="currentColor" stroke="none" />
          </svg>

          {/* Portrait Image with depth shadow */}
          <Image
            src={siteData.profileImage}
            alt={siteData.name}
            width={224}
            height={304}
            sizes="(max-width: 640px) 176px, 224px"
            quality={95}
            className="absolute bottom-0 left-1/2 h-[94%] w-auto -translate-x-1/2 object-contain"
            style={{ filter: "drop-shadow(0 6px 12px rgba(25, 21, 16, 0.09))" }}
            priority
          />
        </div>
      </motion.div>

    </div>
  );
}
