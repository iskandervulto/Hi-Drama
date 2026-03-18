import Link from "next/link";
import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@/lib/sanity";

export default function RecentReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-purple-900">
            Latest Reviews
          </h2>
          <p className="text-gray-500 font-lato text-sm mt-1">
            The most recent shows from the stage
          </p>
        </div>
        <Link
          href="/reviews"
          className="text-purple-700 font-lato text-sm font-semibold hover:text-purple-900 flex items-center gap-1 transition-colors"
        >
          See all
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {reviews.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 font-lato">
          Reviews coming soon — check back shortly!
        </div>
      )}
    </section>
  );
}
