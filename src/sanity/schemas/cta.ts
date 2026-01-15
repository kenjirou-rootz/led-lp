import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'cta',
  title: 'CTAセクション',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'ヘッドライン',
      type: 'string',
      description: '例: まずはお気軽にご相談ください',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subHeadline',
      title: 'サブヘッドライン',
      type: 'string',
      description: '例: 専門スタッフが最適なプランをご提案します',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'プライマリボタンテキスト',
      type: 'string',
      description: '例: 無料相談を申し込む',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'プライマリボタンリンク',
      type: 'string',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'セカンダリボタンテキスト',
      type: 'string',
      description: '例: 資料をダウンロード',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'セカンダリボタンリンク',
      type: 'string',
    }),
    defineField({
      name: 'contactInfo',
      title: '連絡先情報',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: '電話番号',
          type: 'string',
        }),
        defineField({
          name: 'phoneNote',
          title: '電話補足',
          type: 'string',
          description: '例: 平日9:00-18:00',
        }),
        defineField({
          name: 'email',
          title: 'メールアドレス',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: '背景画像',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'headline' },
  },
})
