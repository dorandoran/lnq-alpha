import ApolloClient, { InMemoryCache } from 'apollo-boost'
import config from '@config'

export const client = new ApolloClient({
  uri: config.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache()
})
