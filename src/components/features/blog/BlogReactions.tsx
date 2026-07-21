"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogReactionsProps {
  postSlug: string;
}

type ReactionType = "love" | "smile" | "think" | "inspire";

interface ReactionOption {
  type: ReactionType;
  emoji: string;
  label: string;
  count: number;
}

export default function BlogReactions({ postSlug }: BlogReactionsProps) {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [reactions, setReactions] = useState<ReactionOption[]>([
    { type: "love", emoji: "❤️", label: "Loved it", count: 0 },
    { type: "smile", emoji: "😊", label: "Made me smile", count: 0 },
    { type: "think", emoji: "🤔", label: "Made me think", count: 0 },
    { type: "inspire", emoji: "✨", label: "Inspired me", count: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch reactions from API
  useEffect(() => {
    let isMounted = true;
    async function fetchReactions() {
      try {
        const res = await fetch(`/api/reactions?slug=${encodeURIComponent(postSlug)}`);
        if (!res.ok) throw new Error("Failed to fetch reactions");
        const data = await res.json();
        
        if (isMounted) {
          setSelectedReaction(data.userReaction);
          setReactions([
            { type: "love", emoji: "❤️", label: "Loved it", count: data.reactions.love || 0 },
            { type: "smile", emoji: "😊", label: "Made me smile", count: data.reactions.smile || 0 },
            { type: "think", emoji: "🤔", label: "Made me think", count: data.reactions.think || 0 },
            { type: "inspire", emoji: "✨", label: "Inspired me", count: data.reactions.inspire || 0 },
          ]);
        }
      } catch (err) {
        console.error("Failed to load blog reactions:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReactions();
    return () => {
      isMounted = false;
    };
  }, [postSlug]);

  const handleReact = async (type: ReactionType) => {
    const previousReaction = selectedReaction;
    const isUndoing = previousReaction === type;

    // 1. Optimistic Update
    setSelectedReaction(isUndoing ? null : type);
    setReactions((prev) =>
      prev.map((r) => {
        let countOffset = 0;
        if (r.type === type) countOffset = isUndoing ? -1 : 1;
        else if (r.type === previousReaction) countOffset = -1;
        return { ...r, count: Math.max(0, r.count + countOffset) };
      })
    );

    // 2. API Call
    try {
      const res = await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug: postSlug, type }),
      });

      if (!res.ok) throw new Error("Failed to submit reaction");
      
      const data = await res.json();
      
      // Update with exact values from server
      setSelectedReaction(data.userReaction);
      setReactions([
        { type: "love", emoji: "❤️", label: "Loved it", count: data.reactions.love || 0 },
        { type: "smile", emoji: "😊", label: "Made me smile", count: data.reactions.smile || 0 },
        { type: "think", emoji: "🤔", label: "Made me think", count: data.reactions.think || 0 },
        { type: "inspire", emoji: "✨", label: "Inspired me", count: data.reactions.inspire || 0 },
      ]);
    } catch (err) {
      console.error("Failed to sync reaction with server:", err);
      // Revert optimistic update on failure
      setSelectedReaction(previousReaction);
      setReactions((prev) =>
        prev.map((r) => {
          let countOffset = 0;
          if (r.type === type) countOffset = isUndoing ? 1 : -1;
          else if (r.type === previousReaction) countOffset = 1;
          return { ...r, count: Math.max(0, r.count + countOffset) };
        })
      );
    }
  };

  return (
    <div className="my-10 flex flex-col items-center justify-center border-t border-b border-neutral-200/60 py-8">
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
        How did this article feel?
      </h4>
      <div className="flex flex-wrap justify-center gap-3">
        {reactions.map((r) => {
          const isSelected = selectedReaction === r.type;
          return (
            <button
              key={r.type}
              onClick={() => handleReact(r.type)}
              disabled={loading}
              aria-label={`React with ${r.label}. Current count is ${r.count}`}
              aria-pressed={isSelected}
              className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-neutral-900 border-neutral-900 text-white scale-105 shadow-md"
                  : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 active:scale-95 disabled:opacity-80"
              }`}
            >
              {/* Animated emoji container */}
              <div className="relative flex items-center justify-center">
                <motion.span
                  animate={
                    isSelected
                      ? {
                          scale: [1, 1.4, 0.9, 1.1, 1],
                          y: [0, -8, 2, -1, 0],
                          rotate: [0, -12, 12, -4, 0],
                        }
                      : { scale: 1, y: 0, rotate: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="text-base"
                >
                  {r.emoji}
                </motion.span>
                
                {/* Floating particle effect on click */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -24, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute text-sm pointer-events-none"
                    >
                      {r.emoji}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <span className="font-medium text-xs sm:text-sm">{r.label}</span>
              
              <span
                className={`text-xs rounded-full px-2 py-0.5 transition-colors duration-300 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                }`}
              >
                {r.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
