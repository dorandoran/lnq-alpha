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
const Other = gql`
  type Query {
    user(id: String!): User
    event(id: String!): Event
  }
  type Mutation {
    createUser(
      id: String!
      username: String!
      firstName: String!
      lastName: String!
      dob: String!
      email: String!
      description: String!
      avatarUrl: String!
    ): Boolean
    createEvent(
      userId: String!
      name: String!
      type: String!
      event_date: String!
      location: String!
      description: String!
      created: String!
      avatarUrl: String
      admin: Boolean
      private: Boolean
    ): String
  }
`
// Combine all typeDefs
const typeDefs = [Other, User, Event]

// Provide resolver functions for your schema fields
// Merge resolvers
const resolvers = merge(eventResolvers, userResolvers)

exports.ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})
