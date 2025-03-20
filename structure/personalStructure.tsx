import { TbBookmarks, TbUser } from 'react-icons/tb'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { Person } from '../schemaTypes/documents/person.document'

export const personalStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
  person: Person | null,
) => {
  const currentUserPerson = person!

  return S.listItem()
    .title('Personal')
    .icon(TbUser)
    .child(
      S.list()
        .title('Personal')
        .items([
          S.documentListItem()
            .id(currentUserPerson._id)
            .title('Your personal details')
            .schemaType('person')
            .child(() => S.document().documentId(currentUserPerson._id).schemaType('person')),

          S.listItem()
            .title('Your Bookmarks')
            .icon(TbBookmarks)
            .child(
              S.documentList()
                .title('Your Bookmarks')
                .filter('_id in $personBookmarks')
                .params({
                  personBookmarks: person?.bookmarks?.map((bookmark) => bookmark.reference?._id),
                }),
            ),
        ]),
    )
}
