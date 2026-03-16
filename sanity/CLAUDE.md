# sanity/ — Sanity CMS Schema Definitions

Contains the content model schemas for the embedded Sanity Studio.

## Files

### `schemas/index.ts`
Schema registry — exports the `schemaTypes` array consumed by `sanity.config.ts`. Add new document types here.

### `schemas/review.ts`
The `review` document schema. Fields:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | Yes | e.g. "Into the Woods — Valley Repertory Theatre" |
| `slug` | slug | Yes | Auto-generated from title |
| `date` | date | Yes | Review date |
| `showName` | string | Yes | e.g. "Into the Woods" |
| `theaterName` | string | Yes | e.g. "Valley Repertory Theatre" |
| `youtubeUrl` | url | Yes | Full YouTube watch URL |
| `facebookUrl` | url | No | Link to Facebook post for this review |
| `playbillImage` | image | No | Scan/photo of the show's playbill (hotspot enabled) |
| `playbillUrl` | url | No | Link to full playbill |
| `reviewBody` | portable text | No | Rich text review (supports H2, H3, blockquote, bold, italic) |

Preview shows title + "theaterName · date" as subtitle. Default ordering is date descending.

## Adding new content types
1. Create a new schema file in `schemas/`
2. Import and add it to the `schemaTypes` array in `schemas/index.ts`
3. Add corresponding query functions in `lib/sanity.ts`
