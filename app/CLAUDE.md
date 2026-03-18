# app/ — Next.js App Router Pages

All routes use the Next.js 15 App Router file-based routing convention.

## Layout
- `layout.tsx` — Root layout shared by all pages. Loads Playfair Display + Lato fonts via `next/font/google`, wraps children in `<Header>` and `<Footer>`.
- `globals.css` — Tailwind directives + shared component classes (`.btn-primary`, `.btn-gold`, `.page-title`, `.review-body`, `.section-divider`).
- `not-found.tsx` — Custom 404 page with theater-themed messaging.

## Icons
- `favicon.ico` (32x32), `icon.png` (192x192), `apple-icon.png` (180x180) — auto-detected by Next.js, generated from `public/theater-masks.jpg`.

## Pages

### `/` — Home (`page.tsx`)
Server component. Shows hero banner, 4 recent reviews (from Sanity or sample data), about preview strip, and social media CTA section.

### `/about` — About (`about/page.tsx`)
Server component. Bio section (placeholder content), "how a review works" steps, and social platform link cards. Social links are defined in a `SOCIAL_LINKS` array at the top of the file.

### `/reviews` — Review Archive (`reviews/page.tsx`)
Server component. Fetches all reviews, renders `SearchBar` for client-side filtering via `?q=` URL param, displays results as `ReviewCard` grid.

### `/reviews/[slug]` — Review Detail (`reviews/[slug]/page.tsx`)
Server component. Fetches single review by slug. Shows YouTube embed, Facebook link, and rich text review body via `@portabletext/react`.

### `/show` — The Show (`show/page.tsx`)
Server component with `revalidate = 3600` (ISR, 1 hour). Fetches all YouTube channel videos via `lib/youtube.ts`, passes them to `VideoGrid` client component for paginated display (18 at a time).

### `/studio` — Sanity Studio (`studio/[[...tool]]/page.tsx`)
Client component. Embeds the full Sanity Studio editor using `next-sanity`. Catch-all route `[[...tool]]` lets Sanity handle its own internal routing. Requires Sanity env vars to function.

## Patterns
- Pages are server components; interactivity is delegated to client components in `components/`.
- Next.js 15: `params` and `searchParams` are Promises — must be `await`ed in page components.
- Metadata is exported per-page using Next.js `Metadata` type or `generateMetadata`.
