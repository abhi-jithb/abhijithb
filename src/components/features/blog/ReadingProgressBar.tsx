"use client";

import { useState, useEffect } from "react";

interface ReadingProgressBarProps {
  readingTime: number;
}

export default function ReadingProgressBar({ readingTime }: ReadingProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once to set initial value
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-neutral-200/50 h-[4px]">
      <div
        className="bg-neutral-900 h-full transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
      {scrollProgress > 5 && (
        <div className="absolute top-[8px] right-4 rounded-full bg-neutral-900/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-[2px] shadow-sm select-none">
          {Math.round(scrollProgress)}% read • {readingTime} min left
        </div>
      )}
    </div>
  );
}
