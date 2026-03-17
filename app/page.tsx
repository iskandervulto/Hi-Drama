import Link from "next/link";
import { getRecentReviews } from "@/lib/sanity";
import ReviewCard from "@/components/ReviewCard";

export default async function HomePage() {
  const reviews = await getRecentReviews(4);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="bg-purple-900 bg-curtain-texture relative overflow-hidden">
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
              Everything You Want to Know About Theater
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

      {/* ── TV Schedule ────────────────────────────────────────────── */}
      <section className="bg-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-sm border-4 border-purple-200 shadow-xl flex flex-col sm:flex-row items-stretch overflow-hidden">
            {/* Left slab */}
            <div className="bg-purple-900 text-white flex flex-col items-center justify-center px-8 py-6 sm:py-8 gap-2 shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-gold-400">
                <path d="M21 6h-3.17L19 4.83 17.83 3.66 15.17 6.33 12.5 3.66 9.83 6.33 7.17 3.66 6 4.83 7.17 6H3C1.9 6 1 6.9 1 8v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H3V8h18v12z"/>
              </svg>
              <span className="font-lato text-xs tracking-[0.25em] uppercase text-purple-300 text-center leading-tight">
                On Public<br/>Access TV
              </span>
            </div>
            {/* Right content */}
            <div className="flex-1 px-6 py-6 flex flex-col justify-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="font-lato text-xs font-black uppercase tracking-widest text-red-600">On Air</span>
              </div>
              <p className="font-playfair text-2xl sm:text-3xl font-bold text-purple-900 leading-tight">
                Every Other Saturday
              </p>
              <p className="font-lato text-4xl sm:text-5xl font-black text-purple-800 leading-none tracking-tight">
                1:30–2:00 <span className="text-2xl sm:text-3xl font-bold text-gold-600">PM EST</span>
              </p>
              <div className="mt-1 flex flex-wrap gap-2">
                {[
                  { name: "Spectrum", ch: "Ch. 56" },
                  { name: "RCN", ch: "Ch. 83" },
                  { name: "Fios", ch: "Ch. 3" },
                ].map(({ name, ch }) => (
                  <div key={name} className="bg-purple-900 text-white rounded-sm px-4 py-2 flex flex-col items-center leading-tight">
                    <span className="font-lato text-[10px] uppercase tracking-widest text-purple-300">{name}</span>
                    <span className="font-playfair font-bold text-gold-400 text-lg">{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
            { label: "YouTube", href: "https://www.youtube.com/@evaheinemann7651/videos", color: "bg-red-600 hover:bg-red-700" },
            { label: "Facebook", href: "https://www.facebook.com/hidramas", color: "bg-blue-700 hover:bg-blue-800" },
            { label: "Twitter / X", href: "https://x.com/6_Second_Review", color: "bg-gray-900 hover:bg-black" },
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
