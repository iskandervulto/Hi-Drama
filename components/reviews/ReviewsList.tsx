import { getAllReviews, searchReviews } from "@/lib/sanity";
import type { SearchField, SortOption, Review } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewCard";

function sortReviews(reviews: Review[], sort: SortOption): Review[] {
  const sorted = [...reviews];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.date.localeCompare(a.date));
    case "oldest":
      return sorted.sort((a, b) => a.date.localeCompare(b.date));
    case "a-z":
      return sorted.sort((a, b) => a.showName.localeCompare(b.showName));
    case "z-a":
      return sorted.sort((a, b) => b.showName.localeCompare(a.showName));
    default:
      return sorted;
  }
}

export default async function ReviewsList({ query, field, sort }: { query: string; field: SearchField; sort: SortOption }) {
  const reviews = query
    ? await searchReviews(query, field)
    : await getAllReviews();

  const sorted = sortReviews(reviews, sort);

  if (sorted.length === 0) {
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
          {sorted.length} result{sorted.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}
      {sorted.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </>
  );
}
