import { gql } from 'apollo-server-express'
import { merge } from 'lodash'

import { DateResolvers } from './typeDefs/DateDef'
import { UserResolvers, UserType } from './typeDefs/UserDef'
import { EventResolvers, EventType } from './typeDefs/EventDef'
import { MediaResolvers, MediaType } from './typeDefs/MediaDef'
import { LocationResolvers, LocationType } from './typeDefs/LocationDef'
import { SocialLinkResolvers, SocialLinkType } from './typeDefs/SocialLinkDef'
import { SearchResolvers, SearchType } from './typeDefs/SearchDef'
import {
  NotificationResolvers,
  NotificationType
} from './typeDefs/NotificationDef'

const OtherType = gql`
  scalar Date
  union Hit = UserHit | EventHit

  type Query {
    user(id: String): User
    event(id: String!): Event
    media(id: String!): Media
    getUserEvents(id: String): [Event]
    search(bucket: String!, query: String, filters: String, page: Int): [Hit]
    userSearch(query: String, page: Int, following: [String]): [UserHit]
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
      avatar: AvatarInput!
      name: String!
      type: String!
      date: Date!
      location: LocationInput!
      website: String
      description: String!
      plusOne: Boolean!
      isPrivate: Boolean!
      recipientIds: [String]
      followIds: [String]
    ): Event
    createMedia(ownerId: String!, uri: String!, linkId: String): Media
    createInvites(recipientIds: [String!], eventId: String!): [SocialLink]
    requestFollow(recipientIds: [String!]): [SocialLink]
    updateUser(id: String!, updates: UserUpdateInput!): User
    updateEvent(id: String!, updates: EventUpdateInput!): Event
    deleteEvent(id: String!): Boolean
    deleteMedia(id: String!, linkId: String!, bucket: String!): StorageResponse
  }

  type Subscription {
    notificationAdded: Notification
  }
`

export const typeDefs = [
  OtherType,
  UserType,
  EventType,
  MediaType,
  LocationType,
  SocialLinkType,
  SearchType,
  NotificationType
]
export const resolvers = merge(
  DateResolvers,
  UserResolvers,
  EventResolvers,
  MediaResolvers,
  LocationResolvers,
  SocialLinkResolvers,
  SearchResolvers,
  NotificationResolvers
)
