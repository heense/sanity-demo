import {
  Box,
  Button,
  Card,
  Dialog,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Text,
} from '@sanity/ui'
import { ComponentType, useState } from 'react'
import { TbBookmark } from 'react-icons/tb'
import { SanityDefaultPreview, useSchema } from 'sanity'
import { Bookmark } from './BookmarkInspector'

const BookMark: ComponentType<
  Bookmark & {
    handleOpenDocument: (documentId: string, documentType: string) => void
    personId: string | null
  }
> = ({ reference, note, handleOpenDocument, personId }) => {
  const schemaType = useSchema().get(reference._type)
  const Icon = schemaType?.icon

  const [openDialog, setOpenDialog] = useState<boolean>(false)

  return (
    <Card as="li" style={{ cursor: 'pointer' }}>
      <MenuButton
        button={
          <Button mode="bleed" width={'fill'} padding={10}>
            <SanityDefaultPreview title={reference.title} schemaType={schemaType} icon={Icon} />
          </Button>
        }
        id={`bookmark-button-${reference._id}`}
        menu={
          <Menu>
            <MenuItem
              text="Open document"
              icon={Icon}
              onClick={() => handleOpenDocument(reference._id, reference._type)}
            />
            <MenuDivider />
            <MenuItem
              text="Edit bookmarks"
              icon={TbBookmark}
              onClick={() => {
                if (personId) handleOpenDocument(personId, 'person')
                if (!personId) console.error('No person ID found')
              }}
            />
            <MenuItem text="Open Note" icon={TbBookmark} onClick={() => setOpenDialog(true)} />
          </Menu>
        }
        popover={{ portal: true, placement: 'bottom-start' }}
      />
      {openDialog && (
        <Dialog
          header={`Bookmark note for "${reference.title}" (${reference._type})`}
          id="read-note-dialog"
          onClose={() => setOpenDialog(false)}
          zOffset={100}
          width={1}
        >
          <Box paddingX={5} paddingBottom={4}>
            <Text size={1} as={'p'}>
              {note}
            </Text>
          </Box>
        </Dialog>
      )}
    </Card>
  )
}

export default BookMark
