import languageDocument from './documents/language.document'
import listOptionDocument from './documents/listOption.document'
import marketDocument from './documents/market.document'
import pageDocument from './documents/page.document'
import personDocument from './documents/person.document'
import bookMarkObject from './objects/bookMark.object'
import body from './portableText/body'

export const schemaTypes = [
  // Documents
  pageDocument,

  listOptionDocument,
  languageDocument,

  marketDocument,
  personDocument,

  // objects
  bookMarkObject,

  // Portable Text
  body,
]
