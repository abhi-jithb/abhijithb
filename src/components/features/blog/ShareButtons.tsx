"use client";

import { useState, useEffect } from "react";
import {
  FaLink,
  FaWhatsapp,
  FaLinkedinIn,
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
  postTitle: string;
  postSlug: string;
}

export default function ShareButtons({ postTitle, postSlug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/blog/${postSlug}`);
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

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
    setShowInstagramModal(true);
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(postTitle);

  return (
    <div className="flex flex-col items-center gap-3 py-6 my-4 border-t border-neutral-200/40">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Share this article
      </span>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex h-9 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-xs font-semibold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 active:scale-95 cursor-pointer"
          title="Copy Link"
        >
          <FaLink size={12} className={copied ? "text-emerald-500" : ""} />
          {copied ? "Link Copied!" : "Copy Link"}
        </button>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-emerald-600 shadow-sm transition-all hover:bg-neutral-50 hover:border-emerald-300 active:scale-95"
          title="Share on WhatsApp"
        >
          <FaWhatsapp size={15} />
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-black shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-400 active:scale-95"
          title="Share on X"
        >
          <FaXTwitter size={14} />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-blue-700 shadow-sm transition-all hover:bg-neutral-50 hover:border-blue-300 active:scale-95"
          title="Share on LinkedIn"
        >
          <FaLinkedinIn size={14} />
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-sky-500 shadow-sm transition-all hover:bg-neutral-50 hover:border-sky-300 active:scale-95"
          title="Share on Telegram"
        >
          <FaTelegramPlane size={15} className="mr-0.5" />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-blue-800 shadow-sm transition-all hover:bg-neutral-50 hover:border-blue-500 active:scale-95"
          title="Share on Facebook"
        >
          <FaFacebookF size={13} />
        </a>

        {/* Instagram */}
        <button
          onClick={handleInstagramShare}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-pink-600 shadow-sm transition-all hover:bg-neutral-50 hover:border-pink-300 active:scale-95 cursor-pointer"
          title="Share on Instagram"
        >
          <FaInstagram size={15} />
        </button>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 hover:border-neutral-400 active:scale-95"
          title="Share via Email"
        >
          <FaEnvelope size={14} />
        </a>
      </div>

      {/* Instagram Sharing Instructions Modal */}
      <AnimatePresence>
        {showInstagramModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInstagramModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="paper-panel relative z-10 w-full max-w-md overflow-hidden rounded-2xl p-6 shadow-2xl border border-neutral-200 bg-white flex flex-col gap-4 text-center sm:text-left"
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                  <FaInstagram size={18} className="text-pink-600 animate-pulse" />
                  Share on Instagram Story
                </h3>
                <button
                  onClick={() => setShowInstagramModal(false)}
                  className="rounded px-2 py-1 text-xs font-semibold hover:bg-neutral-100 text-neutral-400 hover:text-black cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Instructions */}
              <div className="text-xs text-neutral-600 flex flex-col gap-2">
                <p className="font-semibold text-emerald-600 text-sm mb-1">
                  ✓ Article link copied to your clipboard!
                </p>
                <p>To share this post on Instagram Stories:</p>
                <ol className="list-decimal pl-4 space-y-1.5 text-left text-[11px]">
                  <li>Take a screenshot of the Story Card below.</li>
                  <li>Open Instagram, swipe to create a new Story, and pick the screenshot.</li>
                  <li>Tap the Stickers button (top right), choose the <strong>Link</strong> sticker, paste the copied link, and place it on top of the card!</li>
                </ol>
              </div>

              {/* Visual Card Preview for Screenshotting */}
              <div className="border border-neutral-200/60 rounded-xl bg-gradient-to-b from-neutral-50 to-neutral-100/50 p-6 flex flex-col items-center justify-center gap-4 shadow-inner relative overflow-hidden select-none">
                {/* Background design elements */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-pink-500/5 blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-purple-500/5 blur-xl pointer-events-none" />
                
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest bg-white/80 border border-neutral-200/50 px-3 py-1 rounded-full shadow-sm">
                  New Article
                </span>
                
                <h4 className="text-base font-bold text-neutral-900 leading-snug font-serif text-center max-w-[280px]">
                  "{postTitle}"
                </h4>

                <p className="text-[10px] text-neutral-500 font-sans tracking-wide">
                  by Abhijith B • abhijithb.vercel.app
                </p>

                <div className="w-8 h-px bg-neutral-300" />
                
                <span className="text-[10px] uppercase font-bold tracking-[0.15em] text-neutral-400 flex items-center gap-1.5 bg-white px-2 py-0.5 rounded shadow-sm border border-neutral-100">
                  🔗 Tap Link Sticker To Read
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
