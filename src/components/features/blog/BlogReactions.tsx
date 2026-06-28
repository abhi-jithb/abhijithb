"use client";

import { useState, useEffect } from "react";

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
    { type: "love", emoji: "❤️", label: "Loved it", count: 8 },
    { type: "smile", emoji: "😊", label: "Made me smile", count: 4 },
    { type: "think", emoji: "🤔", label: "Made me think", count: 5 },
    { type: "inspire", emoji: "✨", label: "Inspired me", count: 7 },
  ]);

  useEffect(() => {
    // Load existing reaction from localStorage
    const saved = localStorage.getItem(`blog-reaction:${postSlug}`);
    if (saved) {
      setSelectedReaction(saved as ReactionType);
    }

    // Generate stable pseudo-random counts based on the slug string hash
    let hash = 0;
    for (let i = 0; i < postSlug.length; i++) {
      hash = postSlug.charCodeAt(i) + ((hash << 5) - hash);
    }
    const seedCounts = [
      Math.abs((hash % 15) + 5),
      Math.abs(((hash >> 2) % 10) + 3),
      Math.abs(((hash >> 4) % 12) + 2),
      Math.abs(((hash >> 6) % 18) + 4),
    ];

    setReactions((prev) =>
      prev.map((r, index) => ({
        ...r,
        count: seedCounts[index] + (saved === r.type ? 1 : 0),
      }))
    );
  }, [postSlug]);

  const handleReact = (type: ReactionType) => {
    const storageKey = `blog-reaction:${postSlug}`;
    const previousReaction = localStorage.getItem(storageKey);

    if (previousReaction === type) {
      // User clicked the same reaction again: undo it
      localStorage.removeItem(storageKey);
      setSelectedReaction(null);
      setReactions((prev) =>
        prev.map((r) =>
          r.type === type ? { ...r, count: Math.max(0, r.count - 1) } : r
        )
      );
      return;
    }

    // Update localStorage
    localStorage.setItem(storageKey, type);
    setSelectedReaction(type);

    setReactions((prev) =>
      prev.map((r) => {
        let countOffset = 0;
        if (r.type === type) countOffset = 1;
        if (r.type === previousReaction) countOffset = -1;
        return { ...r, count: Math.max(0, r.count + countOffset) };
      })
    );
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
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-neutral-900 border-neutral-900 text-white scale-105 shadow-md"
                  : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 active:scale-95"
              }`}
            >
              <span className={`text-base transition-transform duration-300 ${isSelected ? "animate-bounce" : ""}`}>
                {r.emoji}
              </span>
              <span className="font-medium text-xs sm:text-sm">{r.label}</span>
              <span
                className={`text-xs rounded-full px-2 py-0.5 ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-neutral-100 text-neutral-500"
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
