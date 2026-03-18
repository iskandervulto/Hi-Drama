# Hi! Drama — Project Context

Theater critic website for **Hi! Drama**. The critic attends local theater shows, records video reviews for public access TV and YouTube, and posts on Facebook and Twitter. This site is the central hub that ties it all together. Built by a separate developer for the show's creator.

## Tech Stack
- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Sanity CMS v3** — stores and manages written reviews (embedded Studio at `/studio`)
- **YouTube Data API v3** — fetches all channel videos for the `/show` page (server-side, ISR cached)
- **Tailwind CSS** — custom purple/gold theater aesthetic
- **Google Fonts**: Playfair Display (headings) + Lato (body)
- **Vercel** — hosting (free tier)

## Running Locally
```bash
PORT=4000 npm run dev
# → http://localhost:4000
# → http://localhost:4000/studio  (Sanity editor — requires env vars)
```

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (default port 3000, use `PORT=4000` to override) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Environment Variables
Defined in `.env.local` (see `.env.local.example` for template):

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For CMS | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Sanity dataset (defaults to `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Sanity API version (defaults to `2024-01-01`) |
| `YOUTUBE_API_KEY` | For /show | YouTube Data API v3 key |
| `YOUTUBE_CHANNEL_ID` | For /show | YouTube channel ID |

When Sanity env vars are missing, the site falls back to `SAMPLE_REVIEWS` in `lib/sanity.ts`.
When YouTube env vars are missing, `/show` falls back to `SAMPLE_VIDEOS` in `lib/youtube.ts`.

## Pages
| Route | Type | Description |
|---|---|---|
| `/` | Server | Home — hero, 4 recent reviews, about strip, social CTAs |
| `/reviews` | Server | Searchable review archive — `?q=` param drives live search via Fuse.js |
| `/reviews/[slug]` | Server | Review detail — YouTube embed + Facebook link + written review body |
| `/show` | Server (ISR 1hr) | All YouTube channel videos, paginated client-side (18 per page) |
| `/about` | Server | Bio, how-a-review-works, social platform links |
| `/studio/[[...tool]]` | Client | Embedded Sanity CMS editor |

## Project Structure
```
Hi-Drama/
├── app/                    # Next.js App Router pages and layout
│   ├── layout.tsx          # Root layout — fonts, Header, Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind base + shared component classes
│   ├── not-found.tsx       # Custom 404 page
│   ├── favicon.ico         # Browser tab icon (generated from theater masks)
│   ├── icon.png            # Modern browser icon (192x192)
│   ├── apple-icon.png      # iOS home screen icon (180x180)
│   ├── about/page.tsx      # About page
│   ├── reviews/            # Review pages
│   │   ├── page.tsx        # Review archive with search
│   │   └── [slug]/page.tsx # Individual review detail
│   ├── show/page.tsx       # YouTube channel video grid
│   └── studio/[[...tool]]/ # Embedded Sanity Studio
├── components/             # Shared React components
│   ├── Header.tsx          # Site nav + social icon links (client component)
│   ├── Footer.tsx          # Site footer with nav + social links
│   ├── ReviewCard.tsx      # Review preview card (used on home + archive)
│   ├── SearchBar.tsx       # Search input for /reviews (client component)
│   ├── VideoCard.tsx       # YouTube video card with expandable description (client)
│   ├── VideoGrid.tsx       # Paginated video grid with "Show More" (client)
│   └── YouTubeEmbed.tsx    # Responsive YouTube iframe embed
├── lib/                    # Data fetching and utilities
│   ├── sanity.ts           # Sanity client, GROQ queries, Review type, sample data
│   └── youtube.ts          # YouTube API client, pagination, YouTubeVideo type, sample data
├── sanity/                 # Sanity CMS schema definitions
│   └── schemas/
│       ├── index.ts        # Schema registry (exports all schemas)
│       └── review.ts       # Review document schema
├── public/                 # Static assets
│   └── theater-masks.jpg   # Source image for favicon/icons
├── sanity.config.ts        # Sanity Studio configuration
├── tailwind.config.ts      # Custom colors, fonts, background textures
├── next.config.mjs         # Image remote patterns (YouTube, Sanity CDN)
├── tsconfig.json           # TypeScript config
└── .env.local.example      # Environment variable template
```

## Key Architecture Decisions

### Two data sources, same pattern
- **Sanity CMS** powers `/reviews` — structured review documents with rich text, managed via embedded Studio
- **YouTube API** powers `/show` — auto-fetches all channel uploads, no manual entry needed
- Both fall back to sample data arrays when env vars aren't configured

### YouTube API pagination
`lib/youtube.ts` loops through all pages of the YouTube uploads playlist (50 per API page) using `nextPageToken`. This runs server-side at ISR revalidation time (once per hour), so there's no runtime API cost per visitor. The client-side `VideoGrid` component handles display pagination (18 videos at a time with "Show More").

### YouTube API key restrictions
The API key must have **no HTTP referrer restriction** (Application restriction = "None") because Next.js server-side fetches don't send a referrer. Keep only the API restriction (YouTube Data API v3) for security.

### Server vs Client components
Pages are server components that fetch data. Interactive pieces are extracted into client components:
- `VideoGrid.tsx` — "Show More" pagination state
- `VideoCard.tsx` — expandable description toggle
- `SearchBar.tsx` — search input state
- `Header.tsx` — mobile nav toggle + active route highlighting

## Design System
- **Primary**: purple-800/900 (`#6b21a8`, `#581c87`) — used for headers, buttons, nav
- **Accent**: gold-500/600 (`#f59e0b`, `#d97706`) — borders, highlights, CTAs
- **Background**: cream (`#fdf8f4`)
- **Text**: charcoal (`#2d2d2d`)
- **Fonts**: Playfair Display (serif headings), Lato (body text)
- **Shared CSS classes** in `globals.css`: `.btn-primary`, `.btn-gold`, `.page-title`, `.review-body`, `.section-divider`

## Social Media Links
| Platform | URL | Status |
|---|---|---|
| YouTube | `https://www.youtube.com/@evaheinemann7651/videos` | Done |
| Facebook | `https://www.facebook.com/hidramas` | Done |
| Twitter/X | Placeholder (`@hidrama`) | Needs real URL |

Social links appear in: `components/Header.tsx`, `components/Footer.tsx`, `app/about/page.tsx`, `app/page.tsx`

## Still TODO
- [ ] Connect Sanity CMS (create project at sanity.io, fill in `.env.local`, add CORS origins)
- [ ] Replace placeholder Twitter/X URL with real account
- [ ] Add real bio text and photo to `app/about/page.tsx`
- [ ] Replace placeholder portrait div with actual `<Image>` in About page
- [ ] Deploy to Vercel (push to GitHub → connect Vercel → add env vars)
- [ ] Add production URL to Sanity CORS origins after deploy

## External Services
| Service | Purpose | Console |
|---|---|---|
| Sanity.io | CMS for reviews | sanity.io/manage |
| YouTube Data API v3 | Fetch channel videos | console.cloud.google.com |
| Vercel | Hosting | vercel.com/dashboard |
