import Link from "next/link";

export default function HeroSection() {
  return (
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
          Honest, passionate reviews of theater — watch the video,
          read the review, and find your next night out.
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
  );
}
