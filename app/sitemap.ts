import type { MetadataRoute } from "next";
import { getAllReviews } from "@/lib/sanity";

const BASE_URL = "https://www.hi-drama.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reviews = await getAllReviews();

  const reviewEntries: MetadataRoute.Sitemap = reviews.map((review) => ({
    url: `${BASE_URL}/reviews/${review.slug.current}`,
    lastModified: review.date,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/reviews`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/show`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...reviewEntries,
  ];
}
