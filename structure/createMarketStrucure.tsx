import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { apiVersion } from '../lib/api'
import { Market } from '../utils/fetchLanguagesMarketsAndPerson'

export function createMarketStructure(
  market: Market,
  S: StructureBuilder,
  context: StructureResolverContext,
) {
  return S.list()
    .title(`${market.title} specific Content`)
    .items([
      S.listItem()
        .title(`Pages for ${market.title}`)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .filter('_type == "page" && language in $languages')
            .params({ languages: market.languages.map((language) => language.code) })
            .apiVersion(apiVersion),
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .child(
          S.list()
            .title('Site Settings')
            .items([
              S.documentTypeListItem('language').title('Languages'),
              S.documentTypeListItem('market').title('Markets'),
              S.documentTypeListItem('translation.metadata').title('Translation Metadata'),
              S.divider(),
              S.documentTypeListItem('listOption').title('List Options'),
              S.divider(),
            ]),
        ),
    ])
}
