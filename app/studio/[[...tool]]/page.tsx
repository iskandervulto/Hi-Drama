"use client";

import { NextStudio } from "next-sanity/studio";
import Link from "next/link";
import config from "@/sanity.config";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-purple-900 px-4 py-2 flex items-center justify-between z-50 relative flex-shrink-0">
        <p className="text-white font-lato text-sm">Sanity Studio</p>
        <Link
          href="/"
          className="text-gold-500 hover:text-gold-400 font-lato text-sm font-semibold transition-colors"
        >
          ← Back to Site
        </Link>
      </div>
      <div className="flex-1">
        <NextStudio config={config} />
      </div>
    </div>
  );
}
