import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      options: {
        list: [
          { title: '技術的疑問', value: 'technical' },
          { title: '取引・契約', value: 'contract' },
          { title: 'トラブル対応', value: 'trouble' },
          { title: '初心者向け', value: 'beginner' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: '質問',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: '回答',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
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
    {
      title: 'カテゴリ順',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        technical: '技術的疑問',
        contract: '取引・契約',
        trouble: 'トラブル対応',
        beginner: '初心者向け',
      }
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
      }
    },
  },
})
