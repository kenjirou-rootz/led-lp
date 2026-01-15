import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'reason',
  title: '選ばれる理由セクション（Reason）',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'セクションタイトル',
      type: 'string',
      description: '例: 選ばれる3つの理由',
      initialValue: '選ばれる3つの理由',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'セクションサブタイトル',
      type: 'string',
      description: '例: 私たちが選ばれ続けるのには、理由があります。',
    }),
    defineField({
      name: 'items',
      title: '理由カード',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'reasonItem',
          title: '理由アイテム',
          fields: [
            defineField({
              name: 'number',
              title: '番号バッジ',
              type: 'string',
              description: '例: 01, 02, 03',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'タイトル',
              type: 'string',
              description: '例: 業界15年・累計3,500件の実績と信頼',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: '説明文',
              type: 'text',
              rows: 3,
              description: '理由の詳細説明',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'カード画像',
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
              name: 'highlights',
              title: 'ハイライトタグ',
              type: 'array',
              of: [{ type: 'string' }],
              description: '例: 15年の実績, 3,500件以上, 上場企業50社以上',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'number', media: 'image' },
            prepare({ title, subtitle, media }) {
              return {
                title,
                subtitle: `No. ${subtitle}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return {
        title: title || '選ばれる理由セクション',
        subtitle: 'Reason Section',
      }
    },
  },
})
