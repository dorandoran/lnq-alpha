import algoliasearch, { SearchIndex } from 'algoliasearch'
import credentials from '../config/credentials.json'
import {
  ISearchBase,
  ISearchUser,
  EBuckets
} from '../database/firestore/interfaces'

const client = algoliasearch(
  credentials.algolia.api_key,
  credentials.algolia.admin_key
)
export const searchIndex = {
  [EBuckets.USERS]: client.initIndex('users'),
  [EBuckets.EVENTS]: client.initIndex('events')
}

interface ISearch {
  base(searchAttributes: ISearchBase): Promise<any | null>
  user(searchAttributes: ISearchUser): Promise<any | null>
}

export const SearchController: ISearch = {
  base: async ({ bucket, query, filters, page }) => {
    const index: SearchIndex = searchIndex[bucket]

    try {
      const response = await index.search(query, { filters, page })
      return response.hits
    } catch (e) {
      console.log(e)
      return null
    }
  },

  user: async ({ userId, query, page, following = [] }) => {
    const index: SearchIndex = searchIndex.users

    // Create Filter increasing score by following
    let filters = `NOT id:${userId}`
    if (following.length) {
      filters += ` OR (id:${following.join('<score=3> OR id:')}<score=3>)`
    }

    const response = await index.search(query, { filters, page })
    return response.hits.map((hit: any) => {
      return {
        ...hit,
        isFollowing: following.includes(hit.id)
      }
    })
  }
}
