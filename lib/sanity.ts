import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// Only create the live client if a project ID is configured
export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

export function urlFor(source: SanityImageSource) {
  if (!client) throw new Error("Sanity client not configured");
  return imageUrlBuilder(client).image(source);
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  showName: string;
  theaterName: string;
  youtubeUrl: string;
  facebookUrl?: string;
  playbillImage?: { asset: { _ref: string } };
  playbillUrl?: string;
  reviewBody?: unknown[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Extract YouTube video ID from any youtube.com or youtu.be URL */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/** YouTube thumbnail URL from video URL */
export function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeId(url);
  return id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : "/placeholder-thumbnail.jpg";
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const reviewFields = `
  _id,
  title,
  slug,
  date,
  showName,
  theaterName,
  youtubeUrl,
  facebookUrl,
  playbillImage,
  playbillUrl
`;

export async function getAllReviews(): Promise<Review[]> {
  if (!client) return SAMPLE_REVIEWS;
  return client.fetch<Review[]>(
    `*[_type == "review"] | order(date desc) { ${reviewFields} }`
  );
}

export async function getRecentReviews(count = 4): Promise<Review[]> {
  if (!client) return SAMPLE_REVIEWS.slice(0, count);
  return client.fetch<Review[]>(
    `*[_type == "review"] | order(date desc) [0...$count] { ${reviewFields} }`,
    { count: count - 1 } as Record<string, unknown>
  );
}

export async function getReviewBySlug(slug: string): Promise<Review | null> {
  if (!client) {
    return SAMPLE_REVIEWS.find((r) => r.slug.current === slug) || null;
  }
  const result = await client.fetch<Review | null>(
    `*[_type == "review" && slug.current == $slug][0] {
      ${reviewFields},
      reviewBody
    }`,
    { slug } as Record<string, string>
  );
  return result || null;
}

export async function searchReviews(query: string): Promise<Review[]> {
  if (!client) {
    const q = query.toLowerCase();
    return SAMPLE_REVIEWS.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.showName.toLowerCase().includes(q) ||
        r.theaterName.toLowerCase().includes(q)
    );
  }
  const groqQuery = `*[_type == "review" && (
      title match $query ||
      showName match $query ||
      theaterName match $query
    )] | order(date desc) { ${reviewFields} }`;
  return client.fetch<Review[]>(groqQuery, { query: `*${query}*` } as Record<string, string>);
}

// ─── Sample data (shown when Sanity isn't configured yet) ─────────────────────

export const SAMPLE_REVIEWS: Review[] = [
  {
    _id: "1",
    title: "Into the Woods — Valley Repertory Theatre",
    slug: { current: "into-the-woods-valley-rep" },
    date: "2024-11-15",
    showName: "Into the Woods",
    theaterName: "Valley Repertory Theatre",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    facebookUrl: "https://facebook.com",
  },
  {
    _id: "2",
    title: "A Midsummer Night's Dream — Riverside Players",
    slug: { current: "midsummer-riverside-players" },
    date: "2024-10-02",
    showName: "A Midsummer Night's Dream",
    theaterName: "Riverside Players",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    facebookUrl: "https://facebook.com",
  },
  {
    _id: "3",
    title: "Chicago — Lakeside Musical Theatre",
    slug: { current: "chicago-lakeside-musical" },
    date: "2024-09-20",
    showName: "Chicago",
    theaterName: "Lakeside Musical Theatre",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    facebookUrl: "https://facebook.com",
  },
  {
    _id: "4",
    title: "The Phantom of the Opera — Community Arts Center",
    slug: { current: "phantom-community-arts" },
    date: "2024-08-10",
    showName: "The Phantom of the Opera",
    theaterName: "Community Arts Center",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];
