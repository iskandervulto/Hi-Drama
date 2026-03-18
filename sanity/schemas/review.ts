import { defineField, defineType } from "sanity";

export const reviewSchema = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "reviewers",
      title: "Reviewers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "reviewer" }] }],
      description: "Select one or more reviewers",
    }),
    defineField({
      name: "showName",
      title: "Show Name",
      type: "string",
      description: 'e.g. "Into the Woods"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "showName",
        maxLength: 96,
        isUnique: async (slug, context) => {
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id?.replace(/^drafts\./, "");
          const count = await client.fetch<number>(
            `count(*[_type == "review" && slug.current == $slug && !(_id in [$id, $draftId])])`,
            { slug, id, draftId: `drafts.${id}` }
          );
          return count === 0;
        },
      },
      validation: (Rule) =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) return "Slug is required";
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id?.replace(/^drafts\./, "");
          const count = await client.fetch<number>(
            `count(*[_type == "review" && slug.current == $slug && !(_id in [$id, $draftId])])`,
            { slug: slug.current, id, draftId: `drafts.${id}` }
          );
          if (count > 0) {
            return `"${slug.current}" is already taken. Try adding the theater name, e.g. "${slug.current}-${(document?.theaterName as string || "theater-name").toLowerCase().replace(/\s+/g, "-")}"`;
          }
          return true;
        }),
    }),
    defineField({
      name: "date",
      title: "Review Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theaterName",
      title: "Theater / Venue",
      type: "string",
      description: 'The venue where the show is performed, e.g. "Hackensack Performing Arts Center"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productionImage",
      title: "Production Photo URL",
      type: "url",
      description: "Paste a link to a production photo — displayed on the review page",
    }),
    defineField({
      name: "productionCompany",
      title: "Production Company",
      type: "string",
      description: 'e.g. "Valley Repertory Theatre"',
    }),
    defineField({
      name: "playwright",
      title: "Playwright / Author",
      type: "string",
      description: 'e.g. "Stephen Sondheim" — the writer of the show being reviewed',
    }),
    defineField({
      name: "castAndCrew",
      title: "Cast & Crew",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
      description: "Paste cast and crew credits from the playbill — format however you like.",
    }),
    defineField({
      name: "showDetails",
      title: "Show Details",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
      description: "Paste show info — venue, dates, runtime, schedule, ticket link, etc.",
    }),
    defineField({
      name: "reviewBody",
      title: "Review",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook Post URL",
      type: "url",
      description: "Link to the Facebook post for this review",
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description: "Full YouTube watch URL, e.g. https://youtube.com/watch?v=abc123",
    }),
  ],
  preview: {
    select: {
      showName: "showName",
      date: "date",
      theaterName: "theaterName",
    },
    prepare({ showName, date, theaterName }) {
      return {
        title: showName,
        subtitle: `${theaterName} · ${date}`,
      };
    },
  },
  orderings: [
    {
      title: "Date, Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
