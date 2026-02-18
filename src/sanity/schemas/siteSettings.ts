import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'サイト設定',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'サイト名',
      type: 'string',
      description: '推奨30字以内',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'logo',
      title: 'サイトロゴ',
      type: 'image',
      description: 'ヘッダー・フッターに表示するロゴ画像',
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
      name: 'siteDescription',
      title: 'サイト説明（SEO用）',
      type: 'text',
      rows: 3,
      description: '推奨160字以内',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OGP画像',
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
      name: 'contactEmail',
      title: '問い合わせメールアドレス',
      type: 'string',
      description: '推奨50字以内',
      validation: (Rule) => Rule.email().max(50),
    }),
    defineField({
      name: 'contactPhone',
      title: '電話番号',
      type: 'string',
      description: '推奨20字以内',
      validation: (Rule) => Rule.max(20),
    }),
    defineField({
      name: 'companyName',
      title: '会社名',
      type: 'string',
      description: '推奨30字以内',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'companyAddress',
      title: '会社住所',
      type: 'text',
      rows: 2,
      description: '推奨100字以内',
      validation: (Rule) => Rule.max(100),
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
