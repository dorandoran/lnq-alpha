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
const {
  typeDef: Location,
  resolvers: locationResolvers
} = require('./typeDefs/locationType')
const {
  typeDef: Search,
  resolvers: searchResolvers
} = require('./typeDefs/searchType')

// Construct a schema, using GraphQL schema language
// Global Query Object
const Other = gql`
  scalar Date
  union Hit = User | Event

  type StoreDeleteResponse {
    completed: Boolean!
    error: String
  }

  type Query {
    user(id: String): User
    event(id: String!): Event
    media(id: String!): Media
    getUserEvents(id: String): [Event]
    search(bucket: String!, query: String, filters: String, page: Int): [Hit]
  }

  type Mutation {
    createUser(
      id: String!
      firstName: String!
      lastName: String!
      email: String!
    ): User
    createEvent(
      id: String!
      ownerId: String!
      avatarId: String
      name: String!
      type: String!
      date: Date!
      location: LocationInput!
      url: String
      description: String!
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
    updateEvent(id: String!, updates: EventUpdateInput!): Event
    deleteEvent(id: String!): Boolean
    deleteMedia(
      id: String!
      linkId: String!
      bucket: String!
    ): StoreDeleteResponse
  }
`
// Combine all typeDefs
const typeDefs = [Other, User, Event, Media, Invite, Location, Search]

// Provide resolver functions for your fields
// Merge resolvers
const resolvers = merge(
  eventResolvers,
  userResolvers,
  dateResolvers,
  mediaResolvers,
  inviteResolvers,
  locationResolvers,
  searchResolvers
)

module.exports = { typeDefs, resolvers }
