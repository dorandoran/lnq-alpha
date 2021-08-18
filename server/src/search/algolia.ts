import algoliasearch, { SearchIndex } from 'algoliasearch'
import credentials from '../config/credentials.json'
import {
  IUserHit,
  ISearchEvent,
  ISearchUser,
  ISearchHome,
  ISearchLocate,
  EBuckets,
  ESearchUserType
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
  user(searchAttributes: ISearchUser): Promise<IUserHit[] | null>
  locate(searchAttributes: ISearchLocate): Promise<any | null>
}

export const SearchController: ISearch = {
  event: async ({ query, page, filters = '' }) => {
    const index: SearchIndex = searchIndex.events

    let allFilters = 'isPrivate=0'
    if (filters) {
      allFilters += ` AND ${filters}`
    }

    try {
      const response = await index.search(query, { filters: allFilters, page })
      return response.hits
    } catch (e) {
      console.log(e)
      return null
    }
  },

  home: async ({ userId, page }) => {
    const index: SearchIndex = searchIndex.events

    let filters = 'isPrivate=0'

    try {
      const response = await index.search('', { filters, page })
      return response.hits
    } catch (e) {
      console.log(e)
      return null
    }
    // Proximity
    // Following (Their events, events they're going to, top 3 categories)
    // Sponsored/paid events
    // Type of user
  },

  user: async ({
    userId,
    page = 0,
    query = '',
    following = [],
    type,
    filters
  }) => {
    const index: SearchIndex = searchIndex.users

    // Don't include current user
    let allFilters = `(NOT id:${userId})`

    // Create Filter increasing score by following
    // This will be fazed out for the type/filters system
    if (following.length) {
      allFilters += ` OR (id:${following.join('<score=3> OR id:')}<score=3>)`
    }

    if (type) {
      switch (type) {
        case ESearchUserType.FOLLOW:
          if (filters?.length) {
            allFilters += ` OR (id:${filters?.join(' OR id:')})`
          }
          break
        default:
      }
    }

    const response = await index.search(query, { filters: allFilters, page })
    return response.hits.map((hit: any) => {
      return {
        ...hit,
        isFollowing: following.includes(hit.id)
      }
    })
  },

  locate: async ({ userId, page }) => {
    const index: SearchIndex = searchIndex.events

    let filters = `isPrivate=0 AND NOT id:${userId}`

    try {
      const response = await index.search('', { filters, page })
      return response.hits
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
