import ApolloClient from 'apollo-boost'
import { auth } from '@services/firebase'

import config from '@config'

const sendAuthToken = async operation => {
  const token = await auth.currentUser.getIdToken(true)

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
}

export const client = new ApolloClient({
  uri: config.GRAPHQL_ENDPOINT,
  request: sendAuthToken
  // TODO: Custom Graphql Messages
  // onError: error => console.log(error)
})
