import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'listOption',
  title: 'List Option',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
