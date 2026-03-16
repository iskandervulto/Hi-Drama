# components/ — Shared React Components

Reusable UI components used across pages. Components that need interactivity are client components (`"use client"` directive).

## Files

| File | Client? | Purpose |
|---|---|---|
| `Header.tsx` | Yes | Top nav bar with site links + social media icon links. Uses `usePathname()` for active link styling. Contains `SOCIAL_LINKS` array with platform URLs. |
| `Footer.tsx` | No | Site footer with brand tagline, navigation links, and social media links. |
| `ReviewCard.tsx` | No | Card component for review previews. Shows YouTube thumbnail (auto-derived from URL), title, show/theater name, date. Links to `/reviews/[slug]`. |
| `SearchBar.tsx` | Yes | Search input for the reviews archive. Updates `?q=` URL param on submit, drives client-side filtering. |
| `VideoCard.tsx` | Yes | YouTube video card with thumbnail, title, date, and expandable description. Thumbnail + title link to YouTube; description has "Read more"/"Show less" toggle for text longer than 120 chars. |
| `VideoGrid.tsx` | Yes | Paginated grid for `/show`. Displays 18 videos initially, "Show More Episodes" button reveals next 18 from already-fetched data (no API calls). |
| `YouTubeEmbed.tsx` | No | Responsive 16:9 YouTube iframe embed. Takes a video URL, extracts the ID, renders the embed. |

## Conventions
- Styling uses Tailwind utility classes throughout, plus shared classes from `app/globals.css` (`.btn-primary`, `.btn-gold`).
- All components use the project's custom color tokens: `purple-*`, `gold-*`, `cream`, `charcoal`.
- Font classes: `font-playfair` for headings, `font-lato` for body text.
