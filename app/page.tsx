import Link from "next/link";
import { getRecentReviews } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewCard";

export default async function HomePage() {
  const reviews = await getRecentReviews(4);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="bg-purple-900 bg-curtain-texture relative overflow-hidden">
        {/* Decorative corner flourishes */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-gold-600 opacity-40" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-gold-600 opacity-40" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-gold-600 opacity-40" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-gold-600 opacity-40" />

        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-gold-400 font-lato text-sm tracking-[0.3em] uppercase mb-4">
            Now Reviewing
          </p>
          <h1 className="font-playfair text-6xl sm:text-7xl font-bold text-white mb-4 leading-tight">
            Hi! Drama
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16 bg-gold-600" />
            <p className="text-purple-200 font-lato text-lg tracking-widest uppercase text-sm">
              Community Theater Reviews
            </p>
            <div className="h-px w-16 bg-gold-600" />
          </div>
          <p className="text-purple-200 font-lato text-base max-w-xl mx-auto leading-relaxed mb-8">
            Honest, passionate reviews of community theater — watch the video,
            read the critique, and find your next night out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reviews" className="btn-gold">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse All Reviews
            </Link>
            <Link href="/about" className="btn-primary border border-purple-600">
              About the Show
            </Link>
          </div>
        </div>
      </section>

      {/* ── Recent Reviews ─────────────────────────────────────────── */}
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

      {/* ── About strip ────────────────────────────────────────────── */}
      <section className="bg-purple-50 border-t border-b border-purple-100 py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gold-600 font-lato text-xs tracking-[0.3em] uppercase mb-3">
            About the Critic
          </p>
          <h2 className="font-playfair text-3xl font-bold text-purple-900 mb-4">
            Bringing the Stage to Your Screen
          </h2>
          <p className="text-gray-600 font-lato leading-relaxed mb-6">
            Hi! Drama is a community theater review show featuring honest, warm
            takes on local productions. Every review includes a video episode
            you can watch right here, a written critique, and a link to the
            original Facebook post.
          </p>
          <Link href="/about" className="btn-primary">
            Learn More
          </Link>
        </div>
      </section>

      {/* ── Socials CTA ────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-14 text-center">
        <p className="font-playfair text-xl text-purple-800 mb-6">
          Follow along on social media
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: "YouTube", href: "https://youtube.com/@hidrama", color: "bg-red-600 hover:bg-red-700" },
            { label: "Facebook", href: "https://facebook.com/hidrama", color: "bg-blue-700 hover:bg-blue-800" },
            { label: "Twitter / X", href: "https://twitter.com/hidrama", color: "bg-gray-900 hover:bg-black" },
          ].map(({ label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${color} text-white font-lato text-sm font-semibold px-6 py-3 rounded-sm uppercase tracking-wide transition-colors shadow`}
            >
              {label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
