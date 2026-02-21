# Hi! Drama — Project Context

Community theater critic website for **Hi! Drama**. The critic attends local shows, records video reviews for public access TV / YouTube, and posts on Facebook and Twitter. This site is the central hub.

## Tech Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Sanity CMS v3** — stores and manages reviews (embedded Studio at `/studio`)
- **Tailwind CSS** — custom purple/gold theater aesthetic
- **Google Fonts**: Playfair Display (headings) + Lato (body)
- **Vercel** — planned hosting (free tier)

## Running Locally
```bash
PORT=4000 npm run dev
# → http://localhost:4000
# → http://localhost:4000/studio  (Sanity editor)
```

## Pages
| Route | Description |
|---|---|
| `/` | Home — hero, 4 recent reviews, about strip, social CTAs |
| `/reviews` | Searchable archive — `?q=` param drives live search |
| `/reviews/[slug]` | Review detail — YouTube embed + Facebook link + written review |
| `/about` | Bio, how-a-review-works, all social platform links |
| `/studio` | Embedded Sanity CMS editor |

## Sanity Setup (NOT DONE YET)
The site currently runs on **sample/mock data** in `lib/sanity.ts → SAMPLE_REVIEWS`.
To connect real data:
1. Create a project at sanity.io (free)
2. Copy `.env.local.example` → `.env.local`, fill in `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. Add `http://localhost:4000` to CORS origins in the Sanity dashboard
4. Restart dev server — Studio at `/studio` becomes live
5. Add reviews via the Studio form

## Still TODO
- [ ] Connect Sanity (see above)
- [ ] Replace placeholder social media URLs (currently `@hidrama` everywhere):
  - `components/Header.tsx` — SOCIAL_LINKS array
  - `components/Footer.tsx`
  - `app/about/page.tsx` — SOCIAL_LINKS array
  - `app/page.tsx` — bottom CTA section
- [ ] Add real bio text and photo to `app/about/page.tsx`
- [ ] Replace placeholder portrait div with actual `<Image>` in About page
- [ ] Deploy to Vercel (push to GitHub → connect Vercel → add env vars)
- [ ] Add production URL to Sanity CORS origins after deploy

## Key Files
| File | Purpose |
|---|---|
| `lib/sanity.ts` | Sanity client, all GROQ queries, Review type, YouTube helpers |
| `sanity/schemas/review.ts` | Review document schema (fields: title, slug, date, showName, theaterName, youtubeUrl, facebookUrl, playbillImage, playbillUrl, reviewBody) |
| `sanity.config.ts` | Sanity Studio config |
| `tailwind.config.ts` | Color palette — purple, gold, cream, charcoal |
| `app/globals.css` | Shared CSS classes: .btn-primary, .btn-gold, .page-title, .review-body |
| `.env.local.example` | Template for environment variables |

## Design Notes
- Purple-first, theatrical, not overly modern
- Deep purple `#6b21a8` primary, gold `#d97706` accent, cream `#fdf8f4` background
- Serif headings (Playfair Display), clean body (Lato)
- Review cards auto-pull thumbnails from YouTube — no manual image uploads needed
