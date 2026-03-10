import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'productLineup',
  title: '商品ラインナップ',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'セクションタイトル',
      type: 'string',
      description: '推奨30字以内',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'products',
      title: '商品一覧',
      type: 'array',
      description: '最大9商品まで',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'thumbnail',
              title: 'サムネイル画像',
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
              name: 'subtitle',
              title: '小見出し',
              type: 'string',
              description: '推奨30字以内',
              validation: (Rule) => Rule.required().max(30),
            }),
            defineField({
              name: 'attributes',
              title: '属性テキスト',
              type: 'text',
              rows: 3,
              description: '推奨200字以内。形状や使用用途などを自由記述',
              validation: (Rule) => Rule.max(200),
            }),
          ],
          preview: {
            select: {
              title: 'subtitle',
              media: 'thumbnail',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(9),
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
  },
})
