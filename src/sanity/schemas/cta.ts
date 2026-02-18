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
      description: '推奨30字以内。例: まずはお気軽にご相談ください',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'subHeadline',
      title: 'サブヘッドライン',
      type: 'string',
      description: '推奨80字以内。例: 専門スタッフが最適なプランをご提案します',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'プライマリボタンテキスト',
      type: 'string',
      description: '推奨15字以内。例: 無料相談を申し込む',
      validation: (Rule) => Rule.max(15),
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'プライマリボタンリンク',
      type: 'string',
      description: '推奨100字以内',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'セカンダリボタンテキスト',
      type: 'string',
      description: '推奨15字以内。例: 資料をダウンロード',
      validation: (Rule) => Rule.max(15),
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'セカンダリボタンリンク',
      type: 'string',
      description: '推奨100字以内',
      validation: (Rule) => Rule.max(100),
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
          name: 'email',
          title: 'メールアドレス',
          type: 'string',
          description: '推奨50字以内',
          validation: (Rule) => Rule.max(50),
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
