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
      options: {
        list: [
          { title: '展示会', value: 'exhibition' },
          { title: 'ライブ・コンサート', value: 'live' },
          { title: 'デジタルサイネージ', value: 'signage' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tabLabel',
      title: 'タブ表示名',
      type: 'string',
      description: '例: 展示会向け',
      validation: (Rule) => Rule.required(),
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
            }),
            defineField({
              name: 'spec',
              title: '仕様',
              type: 'string',
            }),
            defineField({
              name: 'note',
              title: '備考',
              type: 'string',
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
            }),
            defineField({
              name: 'caption',
              title: 'キャプション',
              type: 'string',
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
