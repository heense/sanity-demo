import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { apiVersion } from '../lib/apiVersion'

export const nestedPagesStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  const documentStore = context.documentStore

  return (
    S.listItem()
      .title('Pages')
      .id('nested-pages-list')
      // .icon(EarthGlobeIcon)
      .child(
        S.documentTypeList('page')
          .id('nested-pages-list-en')
          .title('English Pages')
          .filter(`_type == "page" && language == "en"`)
          .apiVersion(apiVersion)
          .child((pageId, options) =>
            S.list()
              .title('Details')
              .id('nested-pages-list-en-details')
              .items([
                S.listItem()
                  .title('English Page')
                  .id('en-page')
                  .child(S.document().id(pageId).schemaType('page')),
                S.divider(),
                // Add translations here
              ]),
          ),
      )
  )
}
