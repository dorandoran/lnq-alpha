import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from ('apollo-upload-client')
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import config from '@config'

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    if (networkError) console.log(`[Network error]: ${networkError}`)
  }),
  new createUploadLink({
    uri: config.GRAPHQL_ENDPOINT
  })
])

const cache = new InMemoryCache()

export const client = new ApolloClient({ link, cache })
