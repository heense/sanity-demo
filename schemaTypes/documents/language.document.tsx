import { CommentIcon } from '@sanity/icons'
import { defineType } from 'sanity'

export default defineType({
  name: 'language',
  title: 'Language',
  type: 'document',
  icon: CommentIcon,

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'code',
      title: 'Code',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isDefault',
      title: 'Is Default',
      type: 'boolean',
    },
  ],
})
