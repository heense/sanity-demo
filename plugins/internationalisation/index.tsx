import { documentInternationalization } from '@sanity/document-internationalization'
import groq from 'groq'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

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

/*
 * FIELD LEVEL  INTERNATIONALISATION
 */
export const fieldLevelInternationalisationConfig = internationalizedArray({
  languages: (client) =>
    client.fetch(groq`*[_type == "language"]|order(title asc){ "id": code, title }`),
  fieldTypes: ['string'],
})
