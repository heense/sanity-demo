import languageDocument from './documents/language.document'
import listOptionDocument from './documents/listOption.document'
import marketDocument from './documents/market.document'
import pageDocument from './documents/page.document'
import body from './portableText/body'

export const schemaTypes = [
  // Documents
  pageDocument,

  listOptionDocument,
  languageDocument,

  marketDocument,

  // objects

  // Portable Text
  body,
]
