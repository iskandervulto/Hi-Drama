import { PortableText } from "@portabletext/react";
import type { Review } from "@/lib/sanity";

export default function CastAndCrew({ review }: { review: Review }) {
  const hasCast = review.castAndCrew && Array.isArray(review.castAndCrew) && review.castAndCrew.length > 0;
  if (!hasCast) return null;

  return (
    <div className="bg-white border border-purple-100 rounded-sm p-5">
      <h2 className="font-playfair text-lg font-bold text-purple-900 mb-3">
        Cast & Crew
      </h2>
      <div className="font-lato text-sm text-charcoal leading-relaxed whitespace-pre-line">
        <PortableText value={review.castAndCrew as Parameters<typeof PortableText>[0]["value"]} />
      </div>
    </div>
  );
}
