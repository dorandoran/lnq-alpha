const functions = require('firebase-functions')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require('graphql-upload')

const { typeDefs, resolvers } = require('./gql/schema')

// Express Setup
const app = express()
app.use('/', graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 6 }))

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

apolloServer.applyMiddleware({ app, path: '/', cors: true })

// Endpoint...
// exports.{name} is equal to www.theurl.com/{name}
exports.graphql = functions.https.onRequest(app)
