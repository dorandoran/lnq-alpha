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
const {
  typeDef: Invite,
  resolvers: inviteResolvers
} = require('./typeDefs/inviteType')

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
      id: String!
      ownerId: String!
      name: String!
      type: String!
      date: Date!
      location: String!
      description: String!
      url: String
      plusOne: Boolean!
      isPrivate: Boolean!
      recipientIds: [String]
    ): Event
    createMedia(
      id: String!
      userId: String!
      linkId: String!
      uri: String!
    ): Media
    createInvites(recipientIds: [String!], eventId: String!): [Invite]
  }
`
// Combine all typeDefs
const typeDefs = [Other, User, Event, Media, Invite]

// Provide resolver functions for your fields
// Merge resolvers
const resolvers = merge(
  eventResolvers,
  userResolvers,
  dateResolvers,
  mediaResolvers,
  inviteResolvers
)

module.exports = { typeDefs, resolvers }
