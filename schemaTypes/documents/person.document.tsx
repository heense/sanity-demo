import { Flex } from '@sanity/ui'
import { TbUser } from 'react-icons/tb'
import { defineArrayMember, defineField, defineType, ReferenceValue } from 'sanity'
import { Bookmark } from '../../components/inspectors/bookmarkInspector/components/BookmarkInspector'
import { LanguageDoc } from '../../utils/fetchLanguagesMarketsAndPerson'
export interface Person {
  _type: string
  userId: string
  name: string
  bookmarks?: Array<Bookmark>
  languages?: Array<LanguageDoc>
  _id: string
}
export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  liveEdit: true,
  icon: TbUser,
  groups: [
    {
      name: 'personal',
      title: 'Personal',
      default: true,
    },
    {
      name: 'admin',
      title: 'Admin',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: ['personal', 'admin'],
      readOnly: true,
    }),
    defineField({
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'bookmark',
        }),
      ],
      group: ['personal'],
    }),
    defineField({
      name: 'userId',
      title: 'Sanity User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: ['admin'],
      readOnly: true,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'url',
      validation: (Rule) => Rule.required(),
      group: ['admin'],
      readOnly: true,
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'language' }],
          options: {
            filter: ({ document }) => {
              return {
                filter: '_type == "language" && !(_id in $refs)',
                params: {
                  refs: (document?.languages as ReferenceValue[]).map(({ _ref }) => _ref),
                },
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
      group: ['personal', 'admin'],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'userId',
      imgUrl: 'profileImage',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: 'UserId: ' + selection.subtitle,
        media: selection.imgUrl ? (
          <Flex justify={'center'} align={'center'}>
            <img src={selection.imgUrl} style={{ borderRadius: '50%' }} />
          </Flex>
        ) : null,
      }
    },
  },
})
