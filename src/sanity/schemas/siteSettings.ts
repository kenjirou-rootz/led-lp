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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'サイト説明（SEO用）',
      type: 'text',
      rows: 3,
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
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: '問い合わせメールアドレス',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: '電話番号',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: '会社名',
      type: 'string',
    }),
    defineField({
      name: 'companyAddress',
      title: '会社住所',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
