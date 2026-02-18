import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: '導入事例',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'クライアント名',
      type: 'string',
      description: '推奨30字以内。例: 株式会社〇〇',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'industry',
      title: '業種',
      type: 'string',
      description: '推奨15字以内。例: IT・通信',
      validation: (Rule) => Rule.max(15),
    }),
    defineField({
      name: 'eventType',
      title: 'イベント種別',
      type: 'string',
      options: {
        list: [
          { title: '展示会', value: 'exhibition' },
          { title: 'ライブ・コンサート', value: 'live' },
          { title: 'デジタルサイネージ', value: 'signage' },
          { title: '企業イベント', value: 'corporate' },
          { title: 'その他', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: '概要',
      type: 'text',
      rows: 3,
      description: '推奨200字以内。導入の背景や課題',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'result',
      title: '導入効果・成果',
      type: 'array',
      of: [{ type: 'block' }],
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
    select: { title: 'clientName', subtitle: 'eventType' },
  },
})
