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
import { MessageResolvers, MessageType } from './typeDefs/MessageDef'

const OtherType = gql`
  scalar Date
  scalar Upload
  union Hit = UserHit | EventHit

  type Query {
    user(id: String): User
    event(id: String!): Event
    media(id: String!): Media
    getUserEvents(id: String, options: EventQueryOptions): [Event]
    homeSearch(page: Int): [EventHit]
    eventSearch(query: String, filters: String, page: Int): [EventHit]
    userSearch(query: String, page: Int, following: [String]): [UserHit]
    locateSearch(page: Int): [EventHit]
  }

  type Mutation {
    createUser(
      id: String!
      firstName: String!
      lastName: String!
      email: String!
    ): User
    createEvent(
      image: Upload!
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
    createMedia(linkId: String!, type: String!, image: Upload!): Media
    createInvites(recipientIds: [String!], eventId: String!): [SocialLink]
    createMessage(
      conversationId: String
      recipientIds: [String!]
      text: String!
    ): Message
    addComment(eventId: String!, comment: String!): Message
    requestFollow(recipientIds: [String!]): [SocialLink]
    updateUser(id: String, updates: UserUpdateInput!): User
    updateUserAvatar(id: String, image: Upload!): Avatar
    updateNewUser(
      id: String
      username: String!
      dob: Date
      website: String
    ): UpdateNewUserResponse
    updateEvent(id: String!, updates: EventUpdateInput!): Event
    deleteEvent(id: String!): Boolean
    deleteMedia(id: String!, linkId: String!, type: String!): StorageResponse
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
  NotificationType,
  MessageType
]
export const resolvers = merge(
  DateResolvers,
  UserResolvers,
  EventResolvers,
  MediaResolvers,
  LocationResolvers,
  SocialLinkResolvers,
  SearchResolvers,
  NotificationResolvers,
  MessageResolvers
)
