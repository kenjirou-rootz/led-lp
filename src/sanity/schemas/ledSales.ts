import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ledSales',
  title: 'LED販売セールス',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'キャッチコピー',
      type: 'string',
      description: '推奨50字以内',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'image',
      title: '画像',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
          description: '推奨50字以内',
          validation: (Rule) => Rule.max(50),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: '説明テキスト',
      type: 'text',
      rows: 5,
      description: '推奨500字以内',
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTAボタンテキスト',
      type: 'string',
      description: '推奨20字以内',
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTAボタンリンク先',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'subtitle' },
  },
})
