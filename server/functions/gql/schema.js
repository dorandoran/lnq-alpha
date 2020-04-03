const { gql } = require('apollo-server-cloud-functions')
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
const {
  typeDef: Media,
  resolvers: mediaResolvers
} = require('./typeDefs/mediaType')

// Construct a schema, using GraphQL schema language
// Global Query Object
const Other = gql`
  scalar Date

  type Query {
    user(id: String!): User
    event(id: String!): Event
    media(id: String!): Media
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
      date: Date!
      location: String!
      description: String!
      media: [String]
      plusOne: Boolean!
      private: Boolean!
    ): Event
    createMedia(id: String!, uri: String!): Media
  }
`
// Combine all typeDefs
const typeDefs = [Other, User, Event, Media]

// Provide resolver functions for your fields
// Merge resolvers
const resolvers = merge(
  eventResolvers,
  userResolvers,
  dateResolvers,
  mediaResolvers
)

module.exports = { typeDefs, resolvers }
