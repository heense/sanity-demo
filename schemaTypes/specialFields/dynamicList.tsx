import { TagIcon } from '@sanity/icons'
import { defineArrayMember, defineField } from 'sanity'
import DynamicListInput from '../../components/input/DynamicListInput'

export default defineField({
  name: 'dynamicList',
  title: 'Dynamic List',
  type: 'array',
  options: {
    list: [],
  },
  components: {
    input: DynamicListInput,
  },
  of: [
    defineArrayMember({
      type: 'object',
      name: 'dynamicListItem',
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
          type: 'string',
        }),
      ],
    }),
  ],
})
