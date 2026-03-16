"use client";

import { useState } from "react";
import VideoCard from "@/components/VideoCard";
import { YouTubeVideo } from "@/lib/youtube";

const PAGE_SIZE = 18;

export default function VideoGrid({ videos }: { videos: YouTubeVideo[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (videos.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-playfair text-2xl text-purple-800 mb-2">
          No episodes yet
        </p>
        <p className="text-gray-500 font-lato">
          Check back soon — new episodes air every other Saturday.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="font-lato text-sm text-purple-500 uppercase tracking-widest mb-6">
        {videos.length} Episode{videos.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.slice(0, visible).map((video) => (
          <VideoCard key={video.id + video.publishedAt} video={video} />
        ))}
      </div>
      {visible < videos.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm font-lato uppercase tracking-widest"
          >
            Show More Episodes
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
