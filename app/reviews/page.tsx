import { Suspense } from "react";
import type { SearchField, SortOption } from "@/lib/sanity";
import SearchBar from "@/components/SearchBar";
import SortSelect from "@/components/reviews/SortSelect";
import ReviewsList from "@/components/reviews/ReviewsList";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: "Reviews",
  description: "Browse and search all Hi! Drama theater reviews.",
};

interface ReviewsPageProps {
  searchParams: Promise<{ q?: string; field?: string; sort?: string }>;
}

const VALID_FIELDS: SearchField[] = ["all", "showName", "theaterName", "reviewer"];
const VALID_SORTS: SortOption[] = ["newest", "oldest", "a-z", "z-a"];

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.trim() || "";
  const field: SearchField = VALID_FIELDS.includes(resolvedParams.field as SearchField)
    ? (resolvedParams.field as SearchField)
    : "all";
  const sort: SortOption = VALID_SORTS.includes(resolvedParams.sort as SortOption)
    ? (resolvedParams.sort as SortOption)
    : "newest";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.hi-drama.org" },
        { name: "Reviews", url: "https://www.hi-drama.org/reviews" },
      ])} />
      <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="page-title">All Reviews</h1>
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gold-500" />
          <p className="text-gray-500 font-lato text-sm">
            Watch, read, and discover theater
          </p>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-stretch">
        <div className="flex-1 max-w-xl">
          <Suspense>
            <SearchBar defaultValue={query} defaultField={field} />
          </Suspense>
        </div>
        <Suspense>
          <SortSelect value={sort} />
        </Suspense>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Suspense
          fallback={
            <div className="col-span-full text-center py-20 text-purple-300 font-lato">
              Loading reviews…
            </div>
          }
        >
          <ReviewsList query={query} field={field} sort={sort} />
        </Suspense>
      </div>
    </div>
    </>
  );
}
