import { notFound } from "next/navigation";
import Link from "next/link";
import { getReviewBySlug, getAllReviews } from "@/lib/sanity";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import ReviewHeader from "@/components/reviews/ReviewHeader";
import ShowDetails from "@/components/reviews/ShowDetails";
import CastAndCrew from "@/components/reviews/CastAndCrew";
import ReviewBody from "@/components/reviews/ReviewBody";
import FacebookCTA from "@/components/reviews/FacebookCTA";
import type { Metadata } from "next";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const reviews = await getAllReviews();
  return reviews.map((r) => ({ slug: r.slug.current }));
}

export async function generateMetadata({
  params,
}: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) return { title: "Review Not Found" };
  return {
    title: review.showName,
    description: `Hi! Drama reviews ${review.showName} at ${review.theaterName}`,
  };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  return (
    <article className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs font-lato text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-purple-700 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link href="/reviews" className="hover:text-purple-700 transition-colors">
          Reviews
        </Link>
        <span>›</span>
        <span className="text-gray-600 truncate">{review.showName}</span>
      </nav>

      <ReviewHeader review={review} />

      {/* Two-column: photo + cast + show details left, review right */}
      <div className="grid sm:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] gap-6 mb-8">
        <div className="flex flex-col gap-4">
          {review.productionImage && (
            <img
              src={review.productionImage}
              alt={`${review.showName} production photo`}
              className="w-full rounded-sm shadow-md"
            />
          )}
          <CastAndCrew review={review} />
          <ShowDetails review={review} />
        </div>
        <div>
          <ReviewBody review={review} />
        </div>
      </div>

      {review.facebookUrl && <FacebookCTA url={review.facebookUrl} />}

      {/* YouTube embed */}
      {review.youtubeUrl && (
        <section className="mb-8">
          <YouTubeEmbed url={review.youtubeUrl} title={review.showName} />
        </section>
      )}

      {/* Back to reviews */}
      <div className="mt-12 pt-8 border-t border-purple-100">
        <Link
          href="/reviews"
          className="text-purple-700 font-lato text-sm font-semibold hover:text-purple-900 flex items-center gap-2 transition-colors"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all reviews
        </Link>
      </div>
    </article>
  );
}
