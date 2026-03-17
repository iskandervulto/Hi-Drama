import { defineField, defineType } from "sanity";

export const reviewerSchema = defineType({
  name: "reviewer",
  title: "Reviewer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
