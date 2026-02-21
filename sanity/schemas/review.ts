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
      title: "Theater / Company Name",
      type: "string",
      description: 'e.g. "Valley Repertory Theatre"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Video URL",
      type: "url",
      description: "Full YouTube watch URL, e.g. https://youtube.com/watch?v=abc123",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook Post URL",
      type: "url",
      description: "Link to the Facebook post for this review",
    }),
    defineField({
      name: "playbillImage",
      title: "Playbill Cover",
      type: "image",
      description: "Upload a scan or photo of the show's playbill cover — used as the review card image",
      options: { hotspot: true },
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
