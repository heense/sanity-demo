import { Box, Stack, Text } from '@sanity/ui'
import { ComponentType, useMemo } from 'react'
import { useRouter, useRouterState } from 'sanity/router'
import { RouterPanes } from 'sanity/structure'
import BookMark from './BookMark'
import { Bookmark as BookMarkProp } from './BookmarkInspector'

const BookMarks: ComponentType<{ bookmarks: BookMarkProp[]; personId: string | null }> = ({
  bookmarks,
  personId,
}) => {
  if (bookmarks.length === 0) {
    return (
      <Box>
        <Text>You have no bookmarks yet...</Text>
      </Box>
    )
  }

  const { navigate } = useRouter()
  const routerState = useRouterState()
  // * Cast the panes to RouterPanes
  const routerPaneGroups = useMemo<RouterPanes>(
    () => (routerState?.panes || []) as RouterPanes,
    [routerState?.panes],
  )

  const handleOpenDocument = (documentId: string, documentType: string) => {
    const nextPanes: RouterPanes = [
      // keep existing panes
      ...routerPaneGroups,
      [
        {
          id: documentId,
          params: {
            type: documentType,
          },
        },
      ],
    ]

    navigate({
      panes: nextPanes,
    })
  }

  return (
    <Stack as="ul" space={1}>
      {bookmarks.map((bookmark) => (
        <BookMark
          key={bookmark._key}
          personId={personId}
          {...bookmark}
          handleOpenDocument={handleOpenDocument}
        />
      ))}
    </Stack>
  )
}

export default BookMarks
