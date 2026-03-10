import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'problem',
  title: '課題セクション（Problem）',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'セクションタイトル',
      type: 'string',
      description: '推奨30字以内。例: こんなお悩みありませんか？',
      validation: (Rule) => Rule.max(30),
      initialValue: 'こんなお悩みありませんか？',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'セクションサブタイトル',
      type: 'string',
      description: '推奨80字以内。例: LEDビジョンの導入には、さまざまな不安がつきものです。',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'items',
      title: '課題カード',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'problemItem',
          title: '課題アイテム',
          fields: [
            defineField({
              name: 'title',
              title: 'カードタイトル',
              type: 'string',
              description: '推奨20字以内。例: 機材選びがわからない',
              validation: (Rule) => Rule.required().max(20),
            }),
            defineField({
              name: 'description',
              title: '説明文',
              type: 'text',
              rows: 2,
              description: '推奨60字以内。例: LEDビジョンを使いたいが、何を選べばいいかわからない',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'backgroundImage',
              title: '背景画像',
              type: 'image',
              options: { hotspot: true },
              description: '背景画像（未設定の場合はデフォルト表示）',
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
          ],
          preview: {
            select: { title: 'title', media: 'backgroundImage' },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(9),
    }),
    defineField({
      name: 'transitionText',
      title: '遷移テキスト',
      type: 'string',
      description: '推奨30字以内。セクション下部のテキスト（例: そのお悩み、すべて解決できます。）',
      validation: (Rule) => Rule.max(30),
      initialValue: 'そのお悩み、すべて解決できます。',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTAボタンテキスト',
      type: 'string',
      description: '推奨20字以内。例: お問い合わせはこちら',
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'ctaButtonType',
      title: 'CTAボタン遷移先タイプ',
      type: 'string',
      description: 'ボタンクリック時の動作を選択',
      options: {
        list: [
          { title: '外部URLへ遷移', value: 'url' },
          { title: 'お問い合わせエリアへスクロール', value: 'scroll' },
        ],
        layout: 'radio',
      },
      initialValue: 'scroll',
    }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTAボタン遷移先URL',
      type: 'url',
      description: '外部URLを入力（遷移先タイプが「外部URL」の場合のみ）',
      hidden: ({ parent }) => parent?.ctaButtonType !== 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return {
        title: title || '課題セクション',
        subtitle: 'Problem Section',
      }
    },
  },
})
