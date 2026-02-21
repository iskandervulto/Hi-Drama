"use client";

import { getYouTubeId } from "@/lib/sanity";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

export default function YouTubeEmbed({ url, title = "Review video" }: YouTubeEmbedProps) {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <div className="aspect-video bg-purple-100 rounded-sm flex items-center justify-center text-purple-400 font-lato">
        Video unavailable
      </div>
    );
  }

  return (
    <div className="aspect-video w-full rounded-sm overflow-hidden shadow-lg border-2 border-purple-200">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
