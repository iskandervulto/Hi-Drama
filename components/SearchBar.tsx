"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface SearchBarProps {
  defaultValue?: string;
  placeholder?: string;
}

export default function SearchBar({
  defaultValue = "",
  placeholder = "Search by show, theater, or title…",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      startTransition(() => {
        router.replace(`/reviews?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  return (
    <div className="relative">
      {/* Search icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <svg
          className="w-5 h-5 text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-4 py-3
          bg-white border-2 border-purple-200 rounded-sm
          font-lato text-charcoal placeholder-purple-300
          focus:outline-none focus:border-purple-600
          shadow-sm
        "
      />
    </div>
  );
}
