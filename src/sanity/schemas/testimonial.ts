import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: '顧客の声',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'コメント本文',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorName',
      title: '担当者名',
      type: 'string',
      description: '例: 佐藤様',
    }),
    defineField({
      name: 'authorRole',
      title: '役職',
      type: 'string',
      description: '例: マーケティング部 部長',
    }),
    defineField({
      name: 'companyName',
      title: '会社名',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'アバター画像',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'rating',
      title: '評価（星）',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: '表示順',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'companyName', subtitle: 'authorName' },
  },
})
