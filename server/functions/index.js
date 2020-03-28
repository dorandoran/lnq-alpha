const admin = require('firebase-admin')
const functions = require('firebase-functions')

const { ApolloServer } = require('./gql/schema')

// Endpoint...
// exports.{name} is equal to www.theurl.com/{name}
exports.graphql = functions.https.onRequest(ApolloServer.createHandler())
