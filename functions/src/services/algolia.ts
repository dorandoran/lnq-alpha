import algoliasearch from 'algoliasearch'
import credentials from '../config/credentials.json'
import { EBuckets } from '../interfaces'

const client = algoliasearch(
  credentials.algolia.api_key,
  credentials.algolia.admin_key
)
export const searchIndex = {
  [EBuckets.USERS]: client.initIndex('users'),
  [EBuckets.EVENTS]: client.initIndex('events')
}
