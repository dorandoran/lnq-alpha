import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'

import { auth } from '@services/firebase'
import config from '@config'

const httpLink = new HttpLink({
  uri: config.GRAPHQL_ENDPOINT
})

const sendAuthToken = setContext(async () => {
  const token = await auth.currentUser.getIdToken(true)

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const errorHandling = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authFlow = sendAuthToken.concat(errorHandling)
const link = authFlow.concat(httpLink)

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
