import { gql } from 'apollo-server-express'
import { IUserUpdateInput } from '../../database/interfaces/User'

import {
  UserController,
  EventController,
  InviteController,
  FollowController
} from '../../database/controllers'
import {
  IUser,
  IUserCreate,
  IUserUpdate,
  INewUserUpdate,
  IUserUpdateAvatar,
  IAddBookmarkEvent
} from '../../database/interfaces'

export const UserType = gql`
  type User {
    id: String!
    username: String
    firstName: String!
    lastName: String!
    dob: Date
    email: String!
    about: String
    avatar: Avatar
    website: String
    new: Boolean
    numEvents: Int
    numFollowers: Int
    numFollowing: Int
    categories: [String]
    events: [Event]
    invites: [SocialLink]
    followers: [SocialLink]
    following: [SocialLink]
    allowFollowers: Boolean
    inbox: [Message]
    bookmarkEvents: [Event]
    created_at: Date
  }

  type UpdateNewUserResponse {
    response: String
    user: User
  }

  input UserUpdateInput {
    username: String
    firstName: String
    lastName: String
    dob: Date
    about: String
    avatar: Upload
    bannerAvatar: Upload
    website: String
    new: Boolean
    categories: [String]
    allowFollowers: Boolean
    addBookmarkEvents: [String]
    removeBookmarkEvents: [String]
  }
`

export const UserResolvers = {
  Query: {
    user: (
      obj: void,
      args: { id?: string },
      context: { user: IUser } | null
    ) => {
      const id = args.id || context?.user.id
      return UserController.findById(id)
    }
  },
  Mutation: {
    createUser: (parent: void, args: IUserCreate) => {
      return UserController.create(args)
    },
    updateUser: (
      parent: void,
      args: IUserUpdateInput,
      context: { user: IUser }
    ) => {
      const id = args.id || context?.user.id
      return UserController.update({ ...args, id })
    },
    updateNewUser: (
      parent: void,
      args: INewUserUpdate,
      context: { user: IUser }
    ) => {
      args.id = args.id || context?.user.id
      return UserController.updateNewUser(args)
    },
    updateUserAvatar: (
      parent: void,
      args: IUserUpdateAvatar,
      context: { user: IUser }
    ) => {
      const id = args.id || context?.user.id
      return UserController.updateAvatar({ ...args, id })
    }
  },
  User: {
    events: (parent: IUser) => {
      return EventController.findAllByOwnerId(parent.id)
    },
    invites: (parent: IUser) => {
      return InviteController.findAllByRecipientId(parent.id)
    },
    following: (parent: void, args: void, context: { user: IUser }) => {
      const id = context.user.id
      return FollowController.findAllBySenderId(id)
    },
    followers: (parent: void, args: void, context: { user: IUser }) => {
      const id = context.user.id
      return FollowController.findAllByRecipientId(id)
    },
    inbox: (parent: void, args: void, context: { user: IUser }) => {
      const id = context.user.id
      return UserController.getInboxById(id)
    },
    bookmarkEvents: (parent: IUser, args: void) => {
      return EventController.findAll(parent.bookmarkEvents)
    }
  }
}
