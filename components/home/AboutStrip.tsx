import Link from "next/link";

export default function AboutStrip() {
  return (
    <section className="bg-purple-50 border-t border-b border-purple-100 py-14">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-gold-600 font-lato text-xs tracking-[0.3em] uppercase mb-3">
          About the Critic
        </p>
        <h2 className="font-playfair text-3xl font-bold text-purple-900 mb-4">
          Bringing the Stage to Your Screen
        </h2>
        <p className="text-gray-600 font-lato leading-relaxed mb-6">
          Hi! Drama is a theater review show featuring honest, warm
          takes on local productions. Every review includes a video episode
          you can watch right here, a written review, and a link to the
          original Facebook post.
        </p>
        <Link href="/about" className="btn-primary">
          Learn More
        </Link>
      </div>
    </section>
  );
}
