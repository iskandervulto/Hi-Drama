import { PortableText } from "@portabletext/react";
import type { Review } from "@/lib/sanity";

export default function ReviewBody({ review }: { review: Review }) {
  const hasBody = review.reviewBody && Array.isArray(review.reviewBody) && review.reviewBody.length > 0;
  if (!hasBody) return null;

  return (
    <section className="mb-8">
      <div className="bg-white border border-purple-100 rounded-sm shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-purple-200" />
          <p className="font-playfair text-purple-500 text-sm italic">
            The Review
          </p>
          <div className="h-px flex-1 bg-purple-200" />
        </div>
        <div className="review-body prose prose-lg max-w-none font-lato text-charcoal text-justify">
          <PortableText value={review.reviewBody as Parameters<typeof PortableText>[0]["value"]} />
        </div>
        <div className="flex items-center gap-3 mt-6">
          <div className="h-px flex-1 bg-purple-200" />
          <div className="w-2 h-2 rotate-45 bg-gold-500" />
          <div className="h-px flex-1 bg-purple-200" />
        </div>
      </div>
    </section>
  );
}
