"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import type { SortOption } from "@/lib/sanity";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "a-z", label: "A–Z" },
  { value: "z-a", label: "Z–A" },
];

export default function SortSelect({ value }: { value: SortOption }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams.toString());
      const sort = e.target.value;
      if (sort === "newest") {
        params.delete("sort");
      } else {
        params.set("sort", sort);
      }
      startTransition(() => {
        router.replace(`/reviews?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  return (
    <select
      value={value}
      onChange={handleChange}
      className="
        bg-white border-2 border-purple-200 rounded-sm
        font-lato text-charcoal text-sm
        px-3 py-3
        focus:outline-none focus:border-purple-600
        shadow-sm cursor-pointer
      "
    >
      {SORT_OPTIONS.map(({ value: v, label }) => (
        <option key={v} value={v}>{label}</option>
      ))}
    </select>
  );
}
