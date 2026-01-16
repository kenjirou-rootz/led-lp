import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pricingPlan',
  title: '料金プラン',
  type: 'document',
  fields: [
    defineField({
      name: 'planName',
      title: 'プラン名',
      type: 'string',
      description: '例: ベーシック、スタンダード、プレミアム',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: '価格目安',
      type: 'string',
      description: '例: ¥50,000~/日',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priceNote',
      title: '価格補足',
      type: 'string',
      description: '例: 税別・配送費別途',
    }),
    defineField({
      name: 'recommendedFor',
      title: '推奨用途',
      type: 'string',
      description: '例: 小規模展示会・セミナー向け',
    }),
    defineField({
      name: 'features',
      title: '含まれるもの',
      type: 'array',
      of: [{ type: 'string' }],
      description: '各プランに含まれる項目（箇条書き）',
    }),
    defineField({
      name: 'isPopular',
      title: '人気プラン表示',
      type: 'boolean',
      description: '「おすすめ」バッジを表示するか',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'プラン画像',
      type: 'image',
      description: 'プランカードに表示する画像（16:9推奨）',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '代替テキスト',
          description: '画像の説明（アクセシビリティ用）',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: '表示順',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'planName', subtitle: 'price' },
  },
})
