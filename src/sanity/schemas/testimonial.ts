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
      description: '推奨300字以内',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'authorName',
      title: '担当者名',
      type: 'string',
      description: '推奨20字以内。例: 佐藤様',
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'authorRole',
      title: '役職',
      type: 'string',
      description: '推奨30字以内。例: マーケティング部 部長',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'companyName',
      title: '会社名',
      type: 'string',
      description: '推奨30字以内',
      validation: (Rule) => Rule.max(30),
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
