import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'https://us-central1-lnq-alpha.cloudfunctions.net/graphql'
})
