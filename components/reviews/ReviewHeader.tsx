import type { Review } from "@/lib/sanity";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReviewHeader({ review }: { review: Review }) {
  return (
    <header className="mb-8">
      <p className="text-gold-600 font-lato text-xs tracking-widest uppercase mb-2">
        {review.productionCompany ? `${review.productionCompany} — ${review.theaterName}` : review.theaterName}
      </p>
      <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-purple-900 leading-tight mb-1">
        {review.showName}
      </h1>
      {review.playwright && (
        <p className="font-lato text-sm text-purple-500 italic mb-3">
          by {review.playwright}
        </p>
      )}
      <p className="text-gray-400 font-lato text-sm">
        Reviewed{review.reviewers && review.reviewers.length > 0 && (
          <> by <span className="font-bold text-purple-700">{review.reviewers.map(r => r.name).join(" & ")}</span></>
        )} on {formatDate(review.date)}
      </p>

      {/* Decorative rule */}
      <div className="flex items-center gap-3 mt-5">
        <div className="h-px flex-1 bg-purple-100" />
        <div className="w-2 h-2 rotate-45 bg-gold-500" />
        <div className="h-px flex-1 bg-purple-100" />
      </div>
    </header>
  );
}
