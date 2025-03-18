import { createClient } from '@sanity/client'
import groq from 'groq'
import { apiVersion, dataset, projectId } from '../lib/api'

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: false,
  apiVersion: apiVersion,
  perspective: 'published',
})

export interface Market {
  _id: string
  title: string
  code: string
  languages: {
    code: string
    title: string
    _id: string
  }[]
}

export interface LanguageDoc {
  _id: string
  title: string
  code: string
}

/** Fetches all market documents and languages
 *
 * @returns {markets: Market[], languages: LanguageDoc[] | null} An array of market documents or null if an error occurred
 *
 */
export async function fetchLanguagesAndMarkets() {
  try {
    const query = groq`{
      "markets": *[_type == "market"]|order(title asc) {
        _id,
        title,
        code,
        languages[]->{code, title, _id}
      },
      "languages": *[_type == "language"]|order(title asc) {
        _id,
        title,
        code
      }
    }`
    const response: { markets: Market[]; languages: LanguageDoc[] } = await client.fetch(query)
    return response // Returns an array of roles
  } catch (error) {
    console.error('Error fetching markets:', error)
    return null
  }
}
