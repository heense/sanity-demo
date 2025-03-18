import groq from 'groq'
import { TbBrowser } from 'react-icons/tb'
import { map } from 'rxjs'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { apiVersion } from '../lib/apiVersion'

export const nestedPagesStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  const documentStore = context.documentStore

  return S.listItem()
    .title('Pages')
    .id('nested-pages-list')
    .icon(TbBrowser)
    .child(
      S.documentTypeList('page')
        .id('nested-pages-list-en')
        .title('English Pages')
        .filter(`_type == "page" && language == "en"`)
        .apiVersion(apiVersion)
        .child((pageId, options) => {
          const languagePages = documentStore
            .listenQuery(
              groq`*[ _type == "translation.metadata" && references($pageId) ][0]`,
              { pageId: 'page._id' },
              {
                tag: 'language-based-pages-list',
                perspective: 'previewDrafts',
                throttleTime: 1000,
              },
            )
            .pipe(
              map((translations) => {
                return translations.map((translation: any) => {
                  return S.listItem()
                    .title(translation.language.title + ' Page')
                    .id(`pages-list-${translation.language.code}`)
                    .icon(TbBrowser)
                    .child(
                      S.document()
                        .id(translation.page._id)
                        .schemaType('page')
                        .title(translation.language.title + ' Page'),
                    )
                })
              }),
            )

          return S.list()
            .title('Details')
            .id('nested-pages-list-en-details')
            .items([
              S.listItem()
                .title('English Page')
                .id('en-page')
                .icon(TbBrowser)
                .child(S.document().id(pageId).schemaType('page')),
              S.divider(),
              // Add translations here
            ])
        }),
    )
}
