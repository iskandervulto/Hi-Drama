import type { Metadata } from "next";
import Link from "next/link";
import BioSection from "@/components/about/BioSection";
import SocialLinks from "@/components/about/SocialLinks";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hi! Drama — the theater review show on public access TV, YouTube, Facebook, and Twitter.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="page-title">About Hi! Drama</h1>
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-gold-500" />
          <p className="text-gray-500 font-lato text-sm">
            Theater, honestly reviewed
          </p>
        </div>
      </div>

      <BioSection />
      <SocialLinks />

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link href="/reviews" className="btn-primary">
          Read the Reviews
        </Link>
      </div>
    </div>
  );
}
