import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'beltSlider',
  title: 'ベルトスライダー',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: '見出し',
      type: 'string',
      description: '推奨30字以内',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'images',
      title: 'スライダー画像',
      type: 'array',
      description: '帯状に並んで自動スクロールされる画像群',
      of: [
        {
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
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
  },
})
