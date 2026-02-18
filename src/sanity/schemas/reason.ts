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
      description: '推奨30字以内。例: 選ばれる3つの理由',
      validation: (Rule) => Rule.max(30),
      initialValue: '選ばれる3つの理由',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'セクションサブタイトル',
      type: 'string',
      description: '推奨80字以内。例: 私たちが選ばれ続けるのには、理由があります。',
      validation: (Rule) => Rule.max(80),
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
              description: '推奨4字以内。例: 01, 02, 03',
              validation: (Rule) => Rule.required().max(4),
            }),
            defineField({
              name: 'title',
              title: 'タイトル',
              type: 'string',
              description: '推奨30字以内。例: 業界15年・累計3,500件の実績と信頼',
              validation: (Rule) => Rule.required().max(30),
            }),
            defineField({
              name: 'description',
              title: '説明文',
              type: 'text',
              rows: 3,
              description: '推奨200字以内。理由の詳細説明',
              validation: (Rule) => Rule.required().max(200),
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
                  description: '推奨50字以内',
                  validation: (Rule) => Rule.max(50),
                }),
              ],
            }),
            defineField({
              name: 'highlights',
              title: 'ハイライトタグ',
              type: 'array',
              of: [{
                type: 'string',
                validation: (Rule) => Rule.max(15),
              }],
              description: '各タグ推奨15字以内。例: 15年の実績, 3,500件以上, 上場企業50社以上',
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
