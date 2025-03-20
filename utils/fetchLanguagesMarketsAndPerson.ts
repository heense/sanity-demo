import { createClient } from '@sanity/client'
import groq from 'groq'
import { apiVersion, dataset, projectId } from '../lib/api'
import { Person } from '../schemaTypes/documents/person.document'
import { fetchCurrentUser } from './fetchCurrentUser'

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: false,
  apiVersion: apiVersion,
  perspective: 'published',
  withCredentials: true,
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
 * @returns { markets: Market[], languages: LanguageDoc[], person: Person | null } An array of market and language documents as well as the current users person doc - or null if an error occurred
 *
 */
export async function fetchLanguagesMarketsAndPerson() {
  try {
    const currentUser = await fetchCurrentUser(client)

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
      },
      "person": *[_type == "person" && userId == $userId][0]{
        _id,
        name,
        bookmarks[]{_key, reference->{_id, "title": coalesce(title, name), _type}, note},
        languages[]->{_id, title, code}
      }
    }`
    let newPerson: Person | null = null
    const response: { markets: Market[]; languages: LanguageDoc[]; person: Person } = await client
      .fetch(query, {
        userId: currentUser?.id,
      })
      .then((res) => {
        if (!res.person)
          client
            .create({
              _type: 'person',
              userId: currentUser?.id,
              name: currentUser?.name,
            })
            .then((personRes) => (newPerson = personRes as Person))
            .catch((err) => console.error(err))
        return { markets: res.markets, languages: res.languages, person: res.person || newPerson }
      })
    return response // Returns an array of roles
  } catch (error) {
    console.error('Error fetching config data:', error)
    return null
  }
}
