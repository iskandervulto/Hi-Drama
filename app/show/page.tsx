import { getChannelVideos } from "@/lib/youtube";
import VideoGrid from "@/components/VideoGrid";
import { JsonLd, breadcrumbSchema, tvSeriesSchema } from "@/lib/schema";

export const revalidate = 3600; // ISR — refresh channel videos every hour

export const metadata = {
  title: "The Show | Hi! Drama",
  description:
    "Watch every episode of Hi! Drama — your theater review show airing on public access TV and YouTube.",
};

export default async function ShowPage() {
  const videos = await getChannelVideos();

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Home", url: "https://www.hi-drama.org" },
        { name: "The Show", url: "https://www.hi-drama.org/show" },
      ])} />
      <JsonLd data={tvSeriesSchema()} />
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
          <span className="text-white font-semibold">Fios Ch.&nbsp;34</span>.
          Missed an episode? Every show lives on our YouTube channel below.
        </p>
      </section>

      {/* Gold divider */}
      <div className="h-1 bg-gold-500" />

      {/* Video grid */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <VideoGrid videos={videos} />
      </section>
    </main>
    </>
  );
}
