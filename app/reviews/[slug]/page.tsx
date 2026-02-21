import { notFound } from "next/navigation";
import Link from "next/link";
import { getReviewBySlug, getAllReviews } from "@/lib/sanity";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { PortableText } from "@portabletext/react";
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
    title: review.title,
    description: `Hi! Drama reviews ${review.showName} at ${review.theaterName}`,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs font-lato text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-purple-700 transition-colors">
          Home
        </Link>
        <span>›</span>
        <Link
          href="/reviews"
          className="hover:text-purple-700 transition-colors"
        >
          Reviews
        </Link>
        <span>›</span>
        <span className="text-gray-600 truncate">{review.showName}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <p className="text-gold-600 font-lato text-xs tracking-widest uppercase mb-2">
          {review.theaterName}
        </p>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-purple-900 leading-tight mb-3">
          {review.showName}
        </h1>
        <p className="text-gray-400 font-lato text-sm">
          Reviewed on {formatDate(review.date)}
        </p>

        {/* Decorative rule */}
        <div className="flex items-center gap-3 mt-5">
          <div className="h-px flex-1 bg-purple-100" />
          <div className="w-2 h-2 rotate-45 bg-gold-500" />
          <div className="h-px flex-1 bg-purple-100" />
        </div>
      </header>

      {/* YouTube embed */}
      <section className="mb-8">
        <YouTubeEmbed url={review.youtubeUrl} title={review.title} />
      </section>

      {/* Playbill + Facebook CTAs */}
      {(review.playbillUrl || review.facebookUrl) && (
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {review.playbillUrl && (
            <a
              href={review.playbillUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Playbill
            </a>
          )}
        </div>
      )}

      {/* Facebook CTA */}
      {review.facebookUrl && (
        <div className="mb-8 flex justify-center">
          <a
            href={review.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            See the Facebook Post
          </a>
        </div>
      )}

      {/* Written review */}
      {review.reviewBody && Array.isArray(review.reviewBody) && review.reviewBody.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-purple-100" />
            <p className="font-playfair text-purple-400 text-sm italic">
              The Review
            </p>
            <div className="h-px flex-1 bg-purple-100" />
          </div>
          <div className="review-body prose prose-lg max-w-none font-lato text-charcoal">
            <PortableText value={review.reviewBody as Parameters<typeof PortableText>[0]["value"]} />
          </div>
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
