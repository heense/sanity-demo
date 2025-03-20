import { Badge, Box, Button, Dialog, Flex, Stack, Text, TextArea, useToast } from '@sanity/ui'
import groq from 'groq'
import { ComponentType, useEffect, useState } from 'react'
import { TbBookmarkPlus, TbCircleCheck, TbUser } from 'react-icons/tb'
import { DocumentInspectorProps, useClient, useCurrentUser } from 'sanity'
import { apiVersion } from '../../../../lib/api'
import BookMarks from './BookMarks'
import { InspectorHeader } from './InspectorHeader'

export interface Bookmark {
  reference: { _id: string; title: string; _type: string }
  note?: string
  _key?: string
}
const BookmarkInspector: ComponentType<DocumentInspectorProps> = (props) => {
  const client = useClient({ apiVersion }).withConfig({ perspective: 'previewDrafts' })
  const currentUser = useCurrentUser()
  const toast = useToast()
  const [bookmarks, setBookmarks] = useState<Bookmark[] | []>([])
  const [personId, setPersonId] = useState<string | null>(null)
  const [note, setNote] = useState<string | undefined>(undefined)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  useEffect(() => {
    if (currentUser) {
      client
        .fetch<{ bookmarks: Bookmark[]; personId: string }>(
          groq`*[_type == 'person' && userId == $userId ][0]{
            bookmarks[]{
              _key,
              reference-> {
              _id,
              "title": coalesce(title, name),
              _type
            },
            note},
            "personId": _id
          }`,
          {
            userId: currentUser.id,
          },
        )
        .then((data) => {
          data.bookmarks && setBookmarks(data.bookmarks)
          setPersonId(data.personId)
        })
        .catch((error) => {
          console.error(error)
          toast.push({
            closable: true,
            status: 'error',
            title: `Error fetching bookmarks`,
            description: `An error occurred while fetching bookmarks. ${error.message}`,
          })
        })
    }
  }, [currentUser])

  if (!personId) {
    const handleAddPerson = () => {
      client
        .create({
          _type: 'person',
          userId: currentUser?.id,
          name: currentUser?.name,
          profileImage: currentUser?.profileImage,
        })
        .then((res) => {
          setPersonId(res._id)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    return (
      <Flex
        height={'fill'}
        width={'fill'}
        direction={'column'}
        align={'center'}
        justify={'flex-start'}
      >
        <InspectorHeader onClose={props.onClose} />

        <Box padding={6}>
          <Text size={2} muted>
            No person document found for your user. Please add one for yourself first.
          </Text>
        </Box>
        <Button text="Create Person" mode="ghost" icon={TbUser} onClick={handleAddPerson} />
      </Flex>
    )
  }

  const handleAddBookmark = () => {
    if (!personId) {
      return toast.push({
        closable: true,
        status: 'error',
        title: `No corresponding person document for ${currentUser?.name} found`,
        description: `Please add one before adding bookmarks`,
      })
    }
    if (
      bookmarks?.length > 0 &&
      bookmarks?.some((bookmark) => bookmark.reference._id === props.documentId)
    ) {
      return toast.push({
        closable: true,
        status: 'warning',
        title: `Bookmark already exists`,
        description: `You already have a bookmark for this document`,
      })
    }

    client
      .patch(personId!)
      .setIfMissing({ bookmarks: [] })
      .prepend('bookmarks', [
        {
          _type: 'bookmark',
          reference: {
            _type: props.documentType,
            _ref: props.documentId,
          },
          note: note,
        },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then((res) => {
        setOpenDialog(false)
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })
    return toast.push({
      closable: true,
      status: 'success',
      title: `Bookmark added`,
      description: `You have successfully added a bookmark for this document`,
    })
  }

  return (
    <Flex
      height={'fill'}
      width={'fill'}
      direction={'column'}
      align={'flex-start'}
      justify={'flex-start'}
    >
      <InspectorHeader onClose={props.onClose} />
      <Box padding={2}>
        <Flex justify={'center'} align={'center'}>
          <Button
            text="Add Bookmark"
            mode="ghost"
            icon={TbBookmarkPlus}
            onClick={() => setOpenDialog(true)}
            disabled={
              bookmarks?.length > 0 &&
              bookmarks?.some((bookmark) => bookmark.reference._id === props.documentId)
            }
          />
          {bookmarks?.length > 0 &&
            bookmarks?.some((bookmark) => bookmark.reference._id === props.documentId) && (
              <Badge tone="positive" style={{ marginLeft: '-10px', marginBottom: '-25px' }}>
                <Text size={2}>
                  <TbCircleCheck />
                </Text>
              </Badge>
            )}
        </Flex>
        <Box padding={4}>
          <BookMarks bookmarks={bookmarks} personId={personId} />
        </Box>
      </Box>
      {openDialog && (
        <Dialog
          header={`Add bookmark for ${currentUser?.name}`}
          id="add-note-dialog"
          onClose={() => setOpenDialog(false)}
          zOffset={100}
          width={1}
        >
          <Box padding={4}>
            <Stack space={3}>
              <label htmlFor="note">
                <Text size={1} weight="semibold">
                  Note
                </Text>
              </label>
              <TextArea
                fontSize={1}
                onChange={(event) => setNote(event.currentTarget.value)}
                padding={[3, 3, 4]}
                placeholder="Add your note here ... "
                value={note}
                id="note"
              />
              <Flex justify={'flex-end'}>
                <Button
                  text="Add bookmark"
                  mode="ghost"
                  onClick={handleAddBookmark}
                  tone="positive"
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Flex>
  )
}
export default BookmarkInspector
