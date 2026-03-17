import { defineField, defineType } from "sanity";

export const reviewSchema = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Review Title",
      type: "string",
      description: 'e.g. "Into the Woods — Valley Repertory Theatre"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Review Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "showName",
      title: "Show Name",
      type: "string",
      description: 'e.g. "Into the Woods"',
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
      name: "productionCompany",
      title: "Production Company",
      type: "string",
      description: 'e.g. "Valley Repertory Theatre"',
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description: "Full YouTube watch URL, e.g. https://youtube.com/watch?v=abc123",
    }),
    defineField({
      name: "reviewers",
      title: "Reviewers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "reviewer" }] }],
      description: "Select one or more reviewers",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook Post URL",
      type: "url",
      description: "Link to the Facebook post for this review",
    }),
    defineField({
      name: "playbillImage",
      title: "Playbill Cover Image URL",
      type: "url",
      description: "Paste a link to the playbill cover image — used as the review card image",
    }),
    defineField({
      name: "playwright",
      title: "Playwright / Author",
      type: "string",
      description: 'e.g. "Stephen Sondheim" — the writer of the show being reviewed',
    }),
    defineField({
      name: "playbillUrl",
      title: "Playbill Link",
      type: "url",
      description: "Link to the full playbill (e.g. playbill.com, a PDF, or a Google Drive scan)",
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
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      theaterName: "theaterName",
    },
    prepare({ title, date, theaterName }) {
      return {
        title,
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
