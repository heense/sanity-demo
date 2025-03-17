import { defineArrayMember, defineType } from 'sanity'

export default defineType({
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
  ],
})
