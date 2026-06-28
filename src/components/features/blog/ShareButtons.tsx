"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  postTitle: string;
  postSlug: string;
}

export default function ShareButtons({ postTitle, postSlug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isMobileShareAvailable, setIsMobileShareAvailable] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${postSlug}`);
    setIsMobileShareAvailable(!!navigator.share);
  }, [postSlug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.warn("User cancelled share or share failed:", err);
      }
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(postTitle);

  return (
    <div className="flex flex-col items-center gap-3 py-6 my-4">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Share this article
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex h-9 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-xs font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-95 cursor-pointer"
          title="Copy Link"
        >
          {copied ? "✓ Link Copied!" : "🔗 Copy Link"}
        </button>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-base shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
          title="Share on WhatsApp"
        >
          🟢
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-bold shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
          title="Share on X"
        >
          𝕏
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-bold text-blue-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
          title="Share on LinkedIn"
        >
          in
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-base shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
          title="Share on Telegram"
        >
          ✈️
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-bold text-blue-800 shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
          title="Share on Facebook"
        >
          f
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-base shadow-sm transition-all hover:bg-neutral-50 active:scale-95"
          title="Share via Email"
        >
          ✉️
        </a>

        {/* Native Mobile Share */}
        {isMobileShareAvailable && (
          <button
            onClick={handleNativeShare}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-neutral-900 text-white shadow-sm transition-all hover:bg-neutral-800 active:scale-95 cursor-pointer"
            title="System Share"
          >
            📤
          </button>
        )}
      </div>
    </div>
  );
}
