const { ApolloServer, gql } = require('apollo-server-cloud-functions')
const { merge } = require('lodash')

// GQL Type and Resolver Imports
const {
  typeDef: User,
  resolvers: userResolvers
} = require('./typeDefs/userType')
const {
  typeDef: Event,
  resolvers: eventResolvers
} = require('./typeDefs/eventType')

// Construct a schema, using GraphQL schema language
// Global Query Object
const Query = gql`
  type Query {
    user(id: Int!): User
    event(id: Int!): Event
  }
`
// Combine all queries
const typeDefs = [Query, User, Event]

// Provide resolver functions for your schema fields
// Merge resolvers
const resolvers = merge(eventResolvers, userResolvers)

exports.ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})
