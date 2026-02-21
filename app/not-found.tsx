import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="font-playfair text-8xl text-purple-200 font-bold mb-4">404</p>
      <h1 className="font-playfair text-3xl font-bold text-purple-900 mb-3">
        The Curtain Hasn&apos;t Risen Here
      </h1>
      <p className="text-gray-500 font-lato mb-8">
        This page doesn&apos;t exist — but there&apos;s plenty to see backstage.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/" className="btn-primary">Go Home</Link>
        <Link href="/reviews" className="btn-gold">Browse Reviews</Link>
      </div>
    </div>
  );
}
