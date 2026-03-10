import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQセクション設定',
  type: 'document',
  fields: [
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
    prepare() {
      return {
        title: 'FAQセクション設定',
        subtitle: 'FAQ Section Settings',
      }
    },
  },
})
