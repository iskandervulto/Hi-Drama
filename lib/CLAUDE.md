# lib/ — Data Fetching and Utilities

Server-side data layer. Each file handles one external data source and exports types, query functions, and sample fallback data.

## Files

### `sanity.ts` — Sanity CMS Client
- Creates a Sanity client (only if `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, otherwise `client = null`)
- Exports `Review` interface and all GROQ query functions: `getAllReviews()`, `getRecentReviews()`, `getReviewBySlug()`, `searchReviews()`
- Exports YouTube URL helpers: `getYouTubeId()`, `getYouTubeThumbnail()` (used by ReviewCard to auto-generate thumbnails)
- Contains `SAMPLE_REVIEWS` array used as fallback when Sanity isn't configured
- Uses `next-sanity` client with CDN enabled

### `youtube.ts` — YouTube Data API Client
- Exports `YouTubeVideo` interface and `getChannelVideos()` function
- Fetches all videos from a YouTube channel's uploads playlist by paginating through the API (50 per page, loops until no `nextPageToken`)
- Falls back to `SAMPLE_VIDEOS` when `YOUTUBE_API_KEY` or `YOUTUBE_CHANNEL_ID` env vars are missing, or if any API call fails
- Called server-side by `/show` page with ISR (revalidates every hour)

## Pattern
Both files follow the same structure:
1. Types/interfaces
2. Client setup (with env var check)
3. Query/fetch functions (return sample data when unconfigured)
4. Sample data constant at the bottom
