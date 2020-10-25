import { gql } from 'apollo-server-express'
import { SearchController } from '../../search/algolia'
import { UserController } from '../../database/controllers'
import {
  ISearchEvent,
  ISearchUser,
  ISearchHome,
  IUser,
  IUserHit,
  IEventHit
} from '../../database/interfaces'

export const SearchType = gql`
  type Search {
    hits: [Hit]
  }

  type UserHit {
    id: String!
    username: String
    firstName: String!
    lastName: String!
    avatar: Avatar
    description: String
    isFollowing: Boolean
  }

  type EventHit {
    id: String!
    ownerId: String
    owner: User
    avatar: Avatar
    name: String
    type: String
    date: Date
    location: Location
    website: String
    description: String
    updated_at: Date
    created_at: Date
    media: [Media]
    likes: [String]
    numLikes: Int
    plusOne: Boolean
    isPrivate: Boolean
    tier: Int
  }
`

export const SearchResolvers = {
  // Global Query
  Query: {
    homeSearch: (obj: void, args: ISearchHome, context: { user: IUser }) => {
      args.userId = context.user.id
      return SearchController.home(args)
    },
    eventSearch: (obj: void, args: ISearchEvent) => {
      return SearchController.event(args)
    },
    userSearch: (obj: void, args: ISearchUser, context: { user: IUser }) => {
      args.userId = context.user.id
      return SearchController.user(args)
    }
  },
  // Mutations
  Mutation: {},
  // Field Resolve
  Search: {},
  EventHit: {
    owner: (parent: IEventHit) => {
      return UserController.findById(parent.ownerId)
    }
  },
  Hit: {
    __resolveType: (obj: IUserHit & IEventHit) => {
      if (obj.firstName) return 'UserHit'
      if (obj.ownerId) return 'EventHit'
      return null
    }
  }
}
