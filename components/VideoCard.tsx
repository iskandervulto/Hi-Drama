import Image from "next/image";
import { YouTubeVideo } from "@/lib/youtube";

interface VideoCardProps {
  video: YouTubeVideo;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-purple-100"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-purple-100">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
          <div className="w-14 h-14 rounded-full bg-purple-800/80 flex items-center justify-center group-hover:bg-gold-600/90 transition-colors shadow-lg">
            <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 border-t-2 border-gold-500">
        <h3 className="font-playfair text-base text-charcoal font-semibold leading-snug group-hover:text-purple-800 transition-colors line-clamp-2">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-xs text-gray-500 font-lato mt-2 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        )}
        <p className="text-xs text-purple-400 font-lato mt-2 uppercase tracking-widest">
          {formatDate(video.publishedAt)}
        </p>
      </div>
    </a>
  );
}
