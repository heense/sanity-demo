import { TbBookmark } from 'react-icons/tb'
import { defineDocumentInspector } from 'sanity'
import BookmarkInspector from './components/BookmarkInspector'

export const bookmarkInspector = defineDocumentInspector({
  name: 'bookmarks',
  component: BookmarkInspector,
  useMenuItem: () => ({
    icon: TbBookmark,
    showAsAction: true,
    title: 'Bookmarks',
  }),
})
