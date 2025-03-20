import { documentInternationalization } from '@sanity/document-internationalization'
import groq from 'groq'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { LanguageDoc } from '../../utils/fetchLanguagesMarketsAndPerson'

/*
 * DOC LEVEL  INTERNATIONALISATION
 */

export const staticDocumentInternationalisationConfig = documentInternationalization({
  supportedLanguages: [
    { id: 'en', title: 'English' },
    { id: 'es', title: 'Spanish' },
  ],
  schemaTypes: ['page'],
})

export const dynamicDocumentInternationalisationConfig = documentInternationalization({
  supportedLanguages: (client) =>
    client.fetch(groq`*[_type == "language"]|order(title asc){ "id": code, title }`),
  schemaTypes: ['page'],
})

export function dynamicDocumentInternationalisationConfigForMarkets(
  marketLanguages: { title: string; code: string }[],
) {
  return documentInternationalization({
    supportedLanguages: marketLanguages.map((language) => ({
      id: language.code,
      title: language.title,
    })),
    schemaTypes: ['page'],
  })
}

/*
 * FIELD LEVEL  INTERNATIONALISATION
 */
export const fieldLevelInternationalisationConfig = internationalizedArray({
  languages: (client) =>
    client.fetch(groq`*[_type == "language"]|order(title asc){ "id": code, title }`),
  fieldTypes: ['string'],
})
export function fieldLevelInternationalisationConfigLanguages(marketLanguages: LanguageDoc[]) {
  return internationalizedArray({
    languages: marketLanguages.map((language) => ({ id: language.code, title: language.title })),
    fieldTypes: ['string'],
  })
}

export function fieldLevelInternationalisationConfigForMarkets(
  marketLanguages: { title: string; code: string }[],
) {
  return internationalizedArray({
    languages: marketLanguages.map((language) => ({ id: language.code, title: language.title })),
    fieldTypes: ['string'],
  })
}
