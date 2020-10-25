import { ApolloClient } from '@apollo/client'
import { InMemoryCache } from '@apollo/client/cache'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

import { auth } from '@services/firebase'
import config from '@config'

const uploadLink = new createUploadLink({
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
const link = authFlow.concat(uploadLink)

const cache = new InMemoryCache({})

export const client = new ApolloClient({
  link,
  cache
})
