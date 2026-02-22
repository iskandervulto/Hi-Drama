export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date string
  thumbnail: string;   // hqdefault URL
}

export async function getChannelVideos(): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return SAMPLE_VIDEOS;
  }

  // Step 1: Get the uploads playlist ID for the channel
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  );
  if (!channelRes.ok) return SAMPLE_VIDEOS;

  const channelData = await channelRes.json();
  const uploadsPlaylistId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return SAMPLE_VIDEOS;

  // Step 2: Get videos from the uploads playlist
  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`
  );
  if (!playlistRes.ok) return SAMPLE_VIDEOS;

  const playlistData = await playlistRes.json();
  const items: YouTubeVideo[] = (playlistData.items ?? []).map(
    (item: {
      snippet: {
        resourceId: { videoId: string };
        title: string;
        description: string;
        publishedAt: string;
        thumbnails?: { high?: { url: string }; default?: { url: string } };
      };
    }) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnail:
        item.snippet.thumbnails?.high?.url ??
        `https://img.youtube.com/vi/${item.snippet.resourceId.videoId}/hqdefault.jpg`,
    })
  );

  return items.length > 0 ? items : SAMPLE_VIDEOS;
}

// ─── Sample data (shown when YouTube API isn't configured yet) ────────────────

export const SAMPLE_VIDEOS: YouTubeVideo[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Into the Woods — Valley Repertory Theatre | Hi! Drama Episode 12",
    description:
      "We attended Valley Rep's stunning production of Sondheim's Into the Woods. Catch our full review on this week's episode!",
    publishedAt: "2024-11-16T18:00:00Z",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "A Midsummer Night's Dream — Riverside Players | Hi! Drama Episode 11",
    description:
      "Shakespeare in the park! The Riverside Players delivered a magical outdoor production of Midsummer.",
    publishedAt: "2024-10-05T18:00:00Z",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Chicago — Lakeside Musical Theatre | Hi! Drama Episode 10",
    description:
      "All that jazz! We review Lakeside Musical Theatre's high-energy production of Chicago.",
    publishedAt: "2024-09-21T18:00:00Z",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "The Phantom of the Opera — Community Arts Center | Hi! Drama Episode 9",
    description:
      "The chandelier drops! Our review of the Community Arts Center's grand Phantom production.",
    publishedAt: "2024-08-10T18:00:00Z",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  },
];
