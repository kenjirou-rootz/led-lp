import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'useCase',
  title: '用途別提案',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      description: '推奨5字以内。例: 展示会、ライブ、看板',
      validation: (Rule) => Rule.required().max(5),
    }),
    defineField({
      name: 'tabLabel',
      title: 'タブ表示名',
      type: 'string',
      description: '推奨10字以内。例: 展示会向け',
      validation: (Rule) => Rule.required().max(10),
    }),
    defineField({
      name: 'description',
      title: '説明文',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'recommendedEquipment',
      title: '推奨機材リスト',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: '機材名',
              type: 'string',
              description: '推奨20字以内',
              validation: (Rule) => Rule.max(20),
            }),
            defineField({
              name: 'spec',
              title: '仕様',
              type: 'string',
              description: '推奨30字以内',
              validation: (Rule) => Rule.max(30),
            }),
            defineField({
              name: 'note',
              title: '備考',
              type: 'string',
              description: '推奨30字以内',
              validation: (Rule) => Rule.max(30),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'spec' },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: '事例画像',
      type: 'array',
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
            defineField({
              name: 'caption',
              title: 'キャプション',
              type: 'string',
              description: '推奨50字以内',
              validation: (Rule) => Rule.max(50),
            }),
          ],
        },
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
    select: { title: 'tabLabel', subtitle: 'category' },
  },
})
