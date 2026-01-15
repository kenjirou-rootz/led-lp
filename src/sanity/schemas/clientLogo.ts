import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clientLogo',
  title: '取引先ロゴ',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: '会社名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'ロゴ画像',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'WebサイトURL',
      type: 'url',
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
    select: { title: 'companyName', media: 'logo' },
  },
})
