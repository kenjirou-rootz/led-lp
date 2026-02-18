import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'フッター設定',
  type: 'document',
  fields: [
    defineField({
      name: 'companyDescription',
      title: '会社説明文',
      type: 'text',
      rows: 3,
      description: '推奨200字以内。フッターに表示する会社の説明文',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'linkCategories',
      title: 'リンクカテゴリ',
      type: 'array',
      description: '最大5カテゴリ。フッターに表示するリンクグループ',
      validation: (Rule) => Rule.max(5),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'カテゴリタイトル',
              type: 'string',
              description: '推奨20字以内。例: サービス、会社情報、サポート',
              validation: (Rule) => Rule.required().max(20),
            }),
            defineField({
              name: 'links',
              title: 'リンク一覧',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'リンクテキスト',
                      type: 'string',
                      description: '推奨20字以内',
                      validation: (Rule) => Rule.required().max(20),
                    }),
                    defineField({
                      name: 'href',
                      title: 'リンク先URL',
                      type: 'string',
                      description: '推奨200字以内。例: #cta, /about, https://...',
                      validation: (Rule) => Rule.required().max(200),
                    }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'href' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: '電話番号',
      type: 'string',
      description: '推奨20字以内',
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'phoneNote',
      title: '電話補足',
      type: 'string',
      description: '推奨30字以内。例: 平日 11:00〜19:00',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'address',
      title: '住所',
      type: 'text',
      rows: 2,
      description: '推奨100字以内',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'email',
      title: 'メールアドレス',
      type: 'string',
      description: '推奨50字以内',
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: 'copyright',
      title: 'コピーライト',
      type: 'string',
      description: '推奨50字以内。例: LEDビジョンレンタル. All rights reserved.',
      validation: (Rule) => Rule.max(50),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'フッター設定',
        subtitle: 'Footer Settings',
      }
    },
  },
})
