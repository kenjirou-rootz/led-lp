import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'microMeshLed',
  title: 'マイクロメッシュLED',
  type: 'document',
  fields: [
    defineField({
      name: 'catchcopy',
      title: 'キャッチコピー',
      type: 'string',
      description: '推奨50字以内',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'mobileImage',
      title: 'モバイル用画像',
      type: 'image',
      description: 'スマートフォン向けの画像',
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
      name: 'pcImage',
      title: 'PC用画像',
      type: 'image',
      description: 'PC・タブレット向けの画像',
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
      name: 'sellingPointsTitle',
      title: 'セールスポイント見出し',
      type: 'string',
      description: '推奨30字以内',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'sellingPoints',
      title: 'セールスポイント',
      type: 'array',
      description: '最大3つまで。各ポイント推奨50字以内',
      of: [
        {
          type: 'string',
          validation: (Rule) => Rule.max(50),
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: { title: 'catchcopy' },
  },
})
