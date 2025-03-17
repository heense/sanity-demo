import { TagIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'

export default defineField({
  name: 'boringList',
  title: 'Boring List',
  type: 'array',
  options: {
    list: [
      { title: 'Hello everyone!', value: 'boringListItem-1', _type: 'boringListItem' },
      {
        title: 'This is a pretty boring static list of options',
        value: 'boringListItem-2',
        _type: 'boringListItem',
      },
      {
        title: 'We need a dev to add a new option',
        value: 'boringListItem-3',
        _type: 'boringListItem',
      },
    ],
  },
  of: [
    defineArrayMember({
      type: 'object',
      name: 'boringListItem',
      icon: TagIcon,
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'text',
        }),
      ],
    }),
  ],
})
