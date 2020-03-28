const { ApolloServer, gql } = require('apollo-server-cloud-functions')
const { merge } = require('lodash')

// GQL Type and Resolver Imports
const { resolvers: dateResolvers } = require('./typeDefs/dateType')
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
  scalar Date

  type Query {
    user(id: String!): User
    event(id: String!): Event
  }
  type Mutation {
    createUser(
      id: String!
      username: String!
      name: String!
      dob: Date!
      email: String!
    ): User
    createEvent(
      userId: String!
      name: String!
      type: String!
      event_date: Date!
      location: String!
      description: String!
      avatarUrl: String
      admin: Boolean
      private: Boolean
    ): Event
  }
`
// Combine all typeDefs
const typeDefs = [Other, User, Event]

// Provide resolver functions for your fields
// Merge resolvers
const resolvers = merge(eventResolvers, userResolvers, dateResolvers)

exports.ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // TODO: Implement security model to protect endpoint
    console.log(req.headers.authorization)
  },
  playground: true,
  introspection: true
}).createHandler()
