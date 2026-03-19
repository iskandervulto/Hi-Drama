import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { getReviewBySlug } from "@/lib/sanity";
import ReviewHeader from "@/components/reviews/ReviewHeader";

export const metadata: Metadata = {
  title: "Layout Test — Hi! Drama",
};

type PortableTextValue = Parameters<typeof PortableText>[0]["value"];

export default async function TestReviewPage() {
  const review = await getReviewBySlug("the-waterfall");

  if (!review) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <p className="text-charcoal">Review not found.</p>
      </div>
    );
  }

  const hasShowDetails = review.showDetails && Array.isArray(review.showDetails) && review.showDetails.length > 0;
  const hasCastAndCrew = review.castAndCrew && Array.isArray(review.castAndCrew) && review.castAndCrew.length > 0;
  const hasReviewBody = review.reviewBody && Array.isArray(review.reviewBody) && review.reviewBody.length > 0;

  return (
    <article className="max-w-5xl mx-auto px-4 py-12">
      <ReviewHeader review={review} />

      {/* Float layout: show info left, cast & crew right, review flows between and expands */}
      <div className="relative">
        {/* Show Details — floated left */}
        {(review.productionImage || hasShowDetails) && (
          <div className="float-left w-full sm:w-[280px] lg:w-[300px] sm:mr-6 mb-6">
            {review.productionImage && (
              <img
                src={review.productionImage}
                alt={`${review.showName} production photo`}
                className="w-full rounded-sm shadow-md mb-4"
              />
            )}
            {hasShowDetails && (
              <div className="bg-purple-50 border border-purple-100 rounded-sm p-5">
                <h2 className="font-playfair text-lg font-bold text-purple-900 mb-3">
                  Show Details
                </h2>
                <div className="font-lato text-sm text-charcoal leading-relaxed whitespace-pre-line">
                  <PortableText value={review.showDetails as PortableTextValue} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cast & Crew — floated right */}
        {hasCastAndCrew && (
          <div className="float-right w-full sm:w-[280px] lg:w-[300px] sm:ml-6 mb-6">
            <div className="bg-white border border-purple-100 rounded-sm p-5">
              <h2 className="font-playfair text-lg font-bold text-purple-900 mb-3">
                Cast & Crew
              </h2>
              <div className="font-lato text-sm text-charcoal leading-relaxed whitespace-pre-line">
                <PortableText value={review.castAndCrew as PortableTextValue} />
              </div>
            </div>
          </div>
        )}

        {/* Review body — flows between the floats, then goes full width */}
        {hasReviewBody && (
          <div className="review-body prose prose-lg max-w-none font-lato text-charcoal text-justify">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-purple-200" />
              <p className="font-playfair text-purple-500 text-sm italic whitespace-nowrap">
                The Review
              </p>
              <div className="h-px flex-1 bg-purple-200" />
            </div>
            <PortableText value={review.reviewBody as PortableTextValue} />
            <div className="flex items-center gap-3 mt-6">
              <div className="h-px flex-1 bg-purple-200" />
              <div className="w-2 h-2 rotate-45 bg-gold-500" />
              <div className="h-px flex-1 bg-purple-200" />
            </div>
          </div>
        )}

        {/* Clear floats */}
        <div className="clear-both" />
      </div>
    </article>
  );
}
