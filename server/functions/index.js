const functions = require('firebase-functions')
const { ApolloServer } = require('apollo-server-cloud-functions')

const { typeDefs, resolvers } = require('./gql/schema')

// GraphQL Setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // TODO: Implement security model to protect endpoint
    console.log(req)
  },
  playground: true,
  introspection: true
})

// Endpoint...
// exports.{name} is equal to www.theurl.com/{name}
exports.graphql = functions.https.onRequest(apolloServer.createHandler())
