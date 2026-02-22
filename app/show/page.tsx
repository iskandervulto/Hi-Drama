import { getChannelVideos } from "@/lib/youtube";
import VideoCard from "@/components/VideoCard";

export const revalidate = 3600; // ISR — refresh channel videos every hour

export const metadata = {
  title: "The Show | Hi! Drama",
  description:
    "Watch every episode of Hi! Drama — your community theater review show airing on public access TV and YouTube.",
};

export default async function ShowPage() {
  const videos = await getChannelVideos();

  return (
    <main>
      {/* Hero */}
      <section className="bg-purple-900 border-b-4 border-gold-600 py-16 px-4 text-center">
        <p className="text-gold-400 font-lato text-xs uppercase tracking-[0.2em] mb-3">
          On the Air
        </p>
        <h1 className="page-title text-white mb-4">The Show</h1>
        <p className="text-purple-200 font-lato max-w-xl mx-auto leading-relaxed">
          Every other Saturday, 1:30–2:00&nbsp;PM&nbsp;EST — catch Hi!&nbsp;Drama
          live on{" "}
          <span className="text-white font-semibold">Spectrum Ch.&nbsp;56</span>,{" "}
          <span className="text-white font-semibold">RCN Ch.&nbsp;83</span>, or{" "}
          <span className="text-white font-semibold">Fios Ch.&nbsp;3</span>.
          Missed an episode? Every show lives on our YouTube channel below.
        </p>
      </section>

      {/* Gold divider */}
      <div className="h-1 bg-gold-500" />

      {/* Video grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {videos.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-playfair text-2xl text-purple-800 mb-2">
              No episodes yet
            </p>
            <p className="text-gray-500 font-lato">
              Check back soon — new episodes air every other Saturday.
            </p>
          </div>
        ) : (
          <>
            <p className="font-lato text-sm text-purple-500 uppercase tracking-widest mb-6">
              {videos.length} Episode{videos.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
