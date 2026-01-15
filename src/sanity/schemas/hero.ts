import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'ヒーローセクション',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'メインヘッドライン',
      type: 'string',
      description: '例: 展示会の成功を、映像演出で確実なものに。',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subHeadline',
      title: 'サブヘッドライン',
      type: 'string',
      description: '例: 業界15年・累計3,500件の実績。トラブル時も代替機即日対応で安心。',
    }),
    defineField({
      name: 'backgroundType',
      title: '背景タイプ',
      type: 'string',
      description: '背景の種類を選択してください',
      options: {
        list: [
          { title: '画像', value: 'image' },
          { title: '動画（MP4）', value: 'video' },
          { title: 'YouTube', value: 'youtube' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: '背景画像',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.backgroundType !== 'image' && parent?.backgroundType !== undefined,
      fields: [
        defineField({
          name: 'alt',
          title: '代替テキスト',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'backgroundVideo',
      title: '背景動画（MP4）',
      type: 'file',
      description: 'MP4形式の動画ファイルをアップロードしてください',
      options: {
        accept: 'video/mp4',
      },
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'YouTube動画のURLを入力してください（例: https://www.youtube.com/watch?v=xxxxx）',
      hidden: ({ parent }) => parent?.backgroundType !== 'youtube',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'trustBadges',
      title: '信頼バッジ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'アイコン',
              type: 'image',
            }),
            defineField({
              name: 'text',
              title: 'バッジテキスト',
              type: 'string',
              description: '例: 累計3,500件',
            }),
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTAボタンテキスト',
      type: 'string',
      description: '例: 無料相談はこちら',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTAリンク先',
      type: 'string',
      description: '例: #contact',
    }),
  ],
  preview: {
    select: { title: 'headline' },
  },
})
