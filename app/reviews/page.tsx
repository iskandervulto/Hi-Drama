import { Suspense } from "react";
import { getAllReviews, searchReviews } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewCard";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: "Reviews",
  description: "Browse and search all Hi! Drama community theater reviews.",
};

interface ReviewsPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function ReviewsList({ query }: { query: string }) {
  const reviews = query
    ? await searchReviews(query)
    : await getAllReviews();

  if (reviews.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-gray-400 font-lato">
        <p className="text-5xl mb-4">🎭</p>
        <p className="text-lg">No reviews found for &ldquo;{query}&rdquo;</p>
        <p className="text-sm mt-2">Try a different search term.</p>
      </div>
    );
  }

  return (
    <>
      {query && (
        <p className="col-span-full text-sm text-gray-500 font-lato mb-2">
          {reviews.length} result{reviews.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </>
  );
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q?.trim() || "";

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="page-title">All Reviews</h1>
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gold-500" />
          <p className="text-gray-500 font-lato text-sm">
            Watch, read, and discover community theater
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-xl">
        <Suspense>
          <SearchBar defaultValue={query} />
        </Suspense>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense
          fallback={
            <div className="col-span-full text-center py-20 text-purple-300 font-lato">
              Loading reviews…
            </div>
          }
        >
          <ReviewsList query={query} />
        </Suspense>
      </div>
    </div>
  );
}
