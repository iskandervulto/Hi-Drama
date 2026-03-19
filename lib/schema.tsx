import type { Review } from "@/lib/sanity";
import { getYouTubeId } from "@/lib/sanity";

// ─── Constants ────────────────────────────────────────────────────────────────

const SITE_URL = "https://www.hi-drama.org";
const SITE_NAME = "Hi! Drama";
const LOGO_URL = `${SITE_URL}/icon.png`;

const SOCIAL_URLS = {
  youtube: "https://www.youtube.com/@evaheinemann7651/videos",
  facebook: "https://www.facebook.com/hidramas",
  twitter: "https://x.com/6_Second_Review",
};

// Shared publisher reference — reused across schema objects
const HI_DRAMA_PUBLISHER = {
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
};

// ─── Builder functions ────────────────────────────────────────────────────────

/** Organization JSON-LD for Hi! Drama. Place on every page. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Theater reviews by Hi! Drama — honest, passionate reviews of local theater productions in New York City. Watch the video review, read the review, and discover your next night out at the theater.",
    logo: LOGO_URL,
    sameAs: [SOCIAL_URLS.youtube, SOCIAL_URLS.facebook, SOCIAL_URLS.twitter],
  };
}

/** WebSite JSON-LD with SearchAction. Place on homepage. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/reviews?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BreadcrumbList JSON-LD.
 * @param items - Ordered array of { name, url } — include the homepage as the first item.
 */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * CriticReview JSON-LD for an individual review page.
 * @param review - Review object from Sanity.
 */
export function reviewSchema(review: Review) {
  const slug = review.slug.current;
  const reviewerName =
    review.reviewers && review.reviewers.length > 0
      ? review.reviewers[0].name
      : SITE_NAME;

  const itemReviewed: Record<string, unknown> = {
    "@type": "TheaterEvent",
    name: review.showName,
    location: {
      "@type": "PerformingArtsTheater",
      name: review.theaterName,
    },
  };

  if (review.productionCompany) {
    itemReviewed.organizer = {
      "@type": "Organization",
      name: review.productionCompany,
    };
  }

  if (review.playwright) {
    itemReviewed.workPerformed = {
      "@type": "Play",
      name: review.showName,
      author: {
        "@type": "Person",
        name: review.playwright,
      },
    };
  }

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CriticReview",
    name: `Review: ${review.showName}`,
    url: `${SITE_URL}/reviews/${slug}`,
    datePublished: review.date,
    author: {
      "@type": "Person",
      name: reviewerName,
    },
    publisher: HI_DRAMA_PUBLISHER,
    itemReviewed,
  };

  // Attach a VideoObject when a YouTube URL is available
  if (review.youtubeUrl) {
    const videoId = getYouTubeId(review.youtubeUrl);
    schema.video = {
      "@type": "VideoObject",
      name: `Hi! Drama Review: ${review.showName}`,
      description: `Hi! Drama video review of ${review.showName} at ${review.theaterName}.`,
      url: review.youtubeUrl,
      embedUrl: videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : review.youtubeUrl,
      thumbnailUrl: videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : undefined,
      uploadDate: review.date,
      publisher: HI_DRAMA_PUBLISHER,
    };
  }

  return schema;
}

/** TVSeries JSON-LD for the /show page. */
export function tvSeriesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: SITE_NAME,
    description:
      "Hi! Drama is a public access TV show airing in New York City that delivers honest, passionate reviews of local theater productions. Each episode features in-depth discussions and video coverage of NYC-area theater.",
    url: `${SITE_URL}/show`,
    genre: "Theater Review",
    inLanguage: "en",
    countryOfOrigin: {
      "@type": "Country",
      name: "United States",
    },
    actor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publication: [
      {
        "@type": "BroadcastEvent",
        name: "Hi! Drama on Spectrum Channel 56",
        isLiveBroadcast: false,
        broadcastOfEvent: {
          "@type": "PublicationEvent",
          publishedOn: {
            "@type": "BroadcastService",
            name: "Spectrum Channel 56",
            broadcastChannelId: "56",
            broadcastServiceTier: "Public Access",
          },
        },
        broadcastFrequency: "Every other Saturday 1:30–2:00 PM EST",
      },
      {
        "@type": "BroadcastEvent",
        name: "Hi! Drama on RCN Channel 83",
        isLiveBroadcast: false,
        broadcastOfEvent: {
          "@type": "PublicationEvent",
          publishedOn: {
            "@type": "BroadcastService",
            name: "RCN Channel 83",
            broadcastChannelId: "83",
            broadcastServiceTier: "Public Access",
          },
        },
        broadcastFrequency: "Every other Saturday 1:30–2:00 PM EST",
      },
      {
        "@type": "BroadcastEvent",
        name: "Hi! Drama on Fios Channel 34",
        isLiveBroadcast: false,
        broadcastOfEvent: {
          "@type": "PublicationEvent",
          publishedOn: {
            "@type": "BroadcastService",
            name: "Fios Channel 34",
            broadcastChannelId: "34",
            broadcastServiceTier: "Public Access",
          },
        },
        broadcastFrequency: "Every other Saturday 1:30–2:00 PM EST",
      },
    ],
    sameAs: [SOCIAL_URLS.youtube, SOCIAL_URLS.facebook, SOCIAL_URLS.twitter],
  };
}

// ─── React component ──────────────────────────────────────────────────────────

/**
 * Server component that renders a JSON-LD <script> tag.
 * Accepts a single schema object or an array of schema objects.
 *
 * Usage:
 *   <JsonLd data={organizationSchema()} />
 *   <JsonLd data={[organizationSchema(), webSiteSchema()]} />
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
