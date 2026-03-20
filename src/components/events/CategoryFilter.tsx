"use client";

interface CategoryFilterProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function CategoryFilter({ label, active, onClick }: CategoryFilterProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
        active
          ? "border-black bg-black text-white"
          : "border-black/15 text-neutral-700 hover:bg-black/5"
      }`}
    >
      {label}
    </button>
  );
}
