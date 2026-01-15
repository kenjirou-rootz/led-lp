import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'problem',
  title: '課題（Problem）',
  type: 'document',
  fields: [
    defineField({
      name: 'problemText',
      title: '課題テキスト',
      type: 'string',
      description: '例: LEDビジョンを使いたいが、何を選べばいいかわからない',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'アイコン',
      type: 'image',
      description: '課題を表すアイコン画像（任意）',
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
    select: { title: 'problemText', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `表示順: ${subtitle}`,
      }
    },
  },
})
