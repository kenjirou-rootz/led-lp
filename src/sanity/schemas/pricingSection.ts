import { defineType, defineField } from "sanity";

export const pricingSection = defineType({
  name: "pricingSection",
  title: "料金プランセクション設定",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "セクションタイトル",
      type: "string",
      description: "推奨30字以内",
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: "sectionSubtitle",
      title: "セクションサブタイトル",
      type: "text",
      description: "推奨100字以内",
      validation: (Rule) => Rule.max(100),
    }),
  ],
});
