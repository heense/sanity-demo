import { CurrentSanityUser, SanityClient } from '@sanity/client'

export async function fetchCurrentUser(client: SanityClient) {
  try {
    const user = await client.users
      .getById('me')
      .then((res) => res)
      .catch((err) => console.error(err))
    return user as CurrentSanityUser
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
