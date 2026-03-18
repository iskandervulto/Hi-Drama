import { PortableText } from "@portabletext/react";
import type { Review } from "@/lib/sanity";

export default function ShowDetails({ review }: { review: Review }) {
  const hasDetails = review.showDetails && Array.isArray(review.showDetails) && review.showDetails.length > 0;
  if (!hasDetails) return null;

  return (
    <div className="bg-purple-50 border border-purple-100 rounded-sm p-5">
      <h2 className="font-playfair text-lg font-bold text-purple-900 mb-3">
        Show Details
      </h2>
      <div className="font-lato text-sm text-charcoal leading-relaxed whitespace-pre-line">
        <PortableText value={review.showDetails as Parameters<typeof PortableText>[0]["value"]} />
      </div>
    </div>
  );
}
