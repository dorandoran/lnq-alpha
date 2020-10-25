import algoliasearch, { SearchIndex } from 'algoliasearch'
import credentials from '../config/credentials.json'
import {
  ISearchEvent,
  ISearchUser,
  ISearchHome,
  EBuckets
} from '../database/interfaces'

const client = algoliasearch(
  credentials.algolia.api_key,
  credentials.algolia.admin_key
)
export const searchIndex = {
  [EBuckets.USERS]: client.initIndex('users'),
  [EBuckets.EVENTS]: client.initIndex('events')
}

interface ISearch {
  event(searchAttributes: ISearchEvent): Promise<any | null>
  home(searchAttributes: ISearchHome): Promise<any | null>
  user(searchAttributes: ISearchUser): Promise<any | null>
}

export const SearchController: ISearch = {
  event: async ({ query, filters, page }) => {
    const index: SearchIndex = searchIndex.events

    try {
      const response = await index.search(query, { filters, page })
      return response.hits
    } catch (e) {
      console.log(e)
      return null
    }
  },

  home: async ({ userId, page }) => {
    const index: SearchIndex = searchIndex.events

    let facetFilters = [`id:-${userId}`, 'isPrivate:false']
    const response = await index.search('', { facetFilters, page })
    return response.hits

    // Proximity
    // Following (Their events, events they're going to, top 3 categories)
    // Sponsored/paid events
    // Type of user
  },

  user: async ({ userId, query, page, following = [] }) => {
    const index: SearchIndex = searchIndex.users

    // Create Filter increasing score by following
    let facetFilters = `id:-${userId}`
    let filters = ''
    if (following.length) {
      filters += ` (id:${following.join('<score=3> OR id:')}<score=3>)`
    }

    const response = await index.search(query, { filters, page, facetFilters })
    console.log('search ', response)
    return response.hits.map((hit: any) => {
      return {
        ...hit,
        isFollowing: following.includes(hit.id)
      }
    })
  }
}
