"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition, useRef, useEffect } from "react";
import type { SearchField } from "@/lib/sanity";

const FILTER_OPTIONS: { value: SearchField; label: string }[] = [
  { value: "all", label: "All fields" },
  { value: "showName", label: "Show name" },
  { value: "theaterName", label: "Venue" },
  { value: "productionCompany", label: "Production company" },
  { value: "reviewer", label: "Reviewer" },
];

interface SearchBarProps {
  defaultValue?: string;
  defaultField?: SearchField;
}

export default function SearchBar({
  defaultValue = "",
  defaultField = "all",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeField, setActiveField] = useState<SearchField>(defaultField);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navigate = useCallback(
    (value: string, field: SearchField) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      if (field !== "all") {
        params.set("field", field);
      } else {
        params.delete("field");
      }
      startTransition(() => {
        router.replace(`/reviews?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      navigate(e.target.value, activeField);
    },
    [navigate, activeField]
  );

  const handleFieldChange = useCallback(
    (field: SearchField) => {
      setActiveField(field);
      setFilterOpen(false);
      const currentQuery = searchParams.get("q") || "";
      if (currentQuery) {
        navigate(currentQuery, field);
      }
    },
    [navigate, searchParams]
  );

  const placeholder = activeField === "all"
    ? "Search by title, show, venue, or reviewer..."
    : `Search by ${FILTER_OPTIONS.find((o) => o.value === activeField)?.label.toLowerCase()}...`;

  return (
    <div className="relative" ref={dropdownRef}>
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
          w-full pl-12 pr-12 py-3
          bg-white border-2 border-purple-200 rounded-sm
          font-lato text-charcoal placeholder-purple-300
          focus:outline-none focus:border-purple-600
          shadow-sm
        "
      />

      {/* Filter toggle button */}
      <button
        type="button"
        onClick={() => setFilterOpen((prev) => !prev)}
        className="absolute inset-y-0 right-3 flex items-center text-purple-400 hover:text-purple-700 transition-colors"
        aria-label="Filter search fields"
      >
        <svg
          className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter dropdown */}
      {filterOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-purple-200 rounded-sm shadow-lg z-20">
          <p className="px-3 pt-3 pb-1 text-xs text-purple-400 font-lato uppercase tracking-wider">
            Search in
          </p>
          {FILTER_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-purple-50 font-lato text-sm text-charcoal"
            >
              <input
                type="radio"
                name="searchField"
                value={value}
                checked={activeField === value}
                onChange={() => handleFieldChange(value)}
                className="accent-purple-700"
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
