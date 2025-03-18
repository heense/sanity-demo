import { EarthGlobeIcon } from '@sanity/icons'
import groq from 'groq'
import { map } from 'rxjs'
import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { PagePreviewMedia } from '../components/previews/PagePreview'
import { apiVersion } from '../lib/apiVersion'

export const internationalisedPagesStructure = async (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  const documentStore = context.documentStore

  const languagePages = documentStore
    .listenQuery(
      groq`*[_type == "language"]|order(title asc){ _id, title, code }`,
      {},
      {
        tag: 'language-based-pages-list',
      },
    )
    .pipe(
      map((languages) => {
        return S.list()
          .title('Internationalised Pages')
          .items(
            languages.map((language: { title: string; code: string; _id: string }) => {
              return S.listItem()
                .title(language.title + ' Pages')
                .id(`pages-list-${language.code}`)
                .icon(() => <PagePreviewMedia language={language.code} />)
                .child(
                  S.documentTypeList('page')
                    .title(language.title + ' Pages')
                    .filter(`_type == "page" && language == "${language.code}"`)
                    .apiVersion(apiVersion)
                    .canHandleIntent(
                      S.documentTypeList('page')
                        .filter(`_type == "page" && language == "${language.code}"`)
                        .apiVersion(apiVersion)
                        .getCanHandleIntent(),
                    )
                    .initialValueTemplates([
                      S.initialValueTemplateItem('internationalised-page', {
                        language: language.code,
                      }),
                    ]),
                )
            }),
          )
      }),
    )
  return S.listItem()
    .title('Internationalised Pages')
    .id('internationalised-pages-list')
    .icon(EarthGlobeIcon)
    .child(() => languagePages)
}
