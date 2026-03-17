import Link from "next/link";
import Image from "next/image";
import { Review, getYouTubeThumbnail } from "@/lib/sanity";

interface ReviewCardProps {
  review: Review;
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const hasPlaybill = !!review.playbillImage;
  const thumbnail = hasPlaybill
    ? review.playbillImage!
    : review.youtubeUrl
      ? getYouTubeThumbnail(review.youtubeUrl)
      : null;

  return (
    <Link
      href={`/reviews/${review.slug.current}`}
      className="group block bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-purple-100"
    >
      {/* Thumbnail — playbill cover preferred, YouTube fallback */}
      <div className={`relative overflow-hidden bg-purple-100 ${hasPlaybill ? "aspect-[2/3]" : "aspect-video"}`}>
        <Image
          src={thumbnail}
          alt={review.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        {/* Play overlay — only shown when falling back to YouTube thumbnail */}
        {!hasPlaybill && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-14 h-14 rounded-full bg-purple-800/80 flex items-center justify-center group-hover:bg-gold-600/90 transition-colors shadow-lg">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-7 h-7 translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 border-t-2 border-gold-500">
        <p className="text-xs text-purple-500 font-lato uppercase tracking-widest mb-1">
          {review.productionCompany ? `${review.productionCompany} — ${review.theaterName}` : review.theaterName}
        </p>
        <h3 className="font-playfair text-lg text-charcoal font-semibold leading-snug group-hover:text-purple-800 transition-colors">
          {review.showName}
        </h3>
        <p className="text-xs text-gray-400 font-lato mt-2">
          {formatDate(review.date)}
        </p>
      </div>
    </Link>
  );
}
