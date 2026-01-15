import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'reason',
  title: '選ばれる理由（Solution）',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '理由タイトル',
      type: 'string',
      description: '例: 業界15年・累計3,500件の実績と信頼',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '説明文',
      type: 'array',
      of: [{ type: 'block' }],
      description: '理由の詳細説明（リッチテキスト）',
    }),
    defineField({
      name: 'icon',
      title: 'アイコン',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'image',
      title: '補足画像',
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
    select: { title: 'title', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `表示順: ${subtitle}`,
      }
    },
  },
})
