import { CogIcon } from '@sanity/icons'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { Person } from '../schemaTypes/documents/person.document'
import { hiddenDocTypes } from './hiddenDocTypes'
import { internationalisedPagesStructure } from './internationalisedPagesStructure'
import { personalStructure } from './personalStructure'

/** # Structure Tool with Custom Structure list
 *
 * This is the custom structure tool for the studio.
 *
 * ## AI Assist context document type
 *
 * the `assist.instruction.context` document type is hidden here {@link hiddenDocTypes}
 *
 * (go to the Template Structure to work on those)
 */
export const customStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
  person: Person | null,
) => {
  return S.list()
    .title('Content')
    .items([
      await personalStructure(S, context, person),
      S.listItem().title(`All Pages`).child(S.documentTypeList('page').title('Pages')),
      await internationalisedPagesStructure(S, context),
      S.divider(),
      S.listItem()
        .title('Sources & Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Sources & Settings')
            .items([
              S.documentTypeListItem('language').title('Languages'),
              S.documentTypeListItem('market').title('Markets'),
              S.documentTypeListItem('translation.metadata').title('Translation Metadata'),
              S.divider(),
              S.documentTypeListItem('listOption').title('List Options'),
              S.documentTypeListItem('person').title('Studio Members (persons)'),
              S.divider(),
            ]),
        ),
    ])
}
