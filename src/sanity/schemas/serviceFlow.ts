import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'serviceFlow',
  title: 'サービスフロー',
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
      name: 'steps',
      title: 'ステップ',
      type: 'array',
      description: 'ステップを追加・並替できます。番号は表示順から自動生成されます',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'ステップタイトル',
              type: 'string',
              description: '推奨20字以内。例: ヒアリング',
              validation: (Rule) => Rule.required().max(20),
            }),
            defineField({
              name: 'description',
              title: 'プロセス説明',
              type: 'text',
              rows: 3,
              description: '推奨150字以内',
              validation: (Rule) => Rule.max(150),
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
  },
})
