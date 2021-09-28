import { gql } from 'apollo-server-express'
import {
  InviteController,
  UserController,
  EventController,
  FollowController
} from '../../database/controllers'
import {
  ISocialLink,
  IUser,
  IInvitesCreate,
  IFollowRequest,
  IInvite,
  ENotificationType
} from '../../database/interfaces'

export const SocialLinkType = gql`
  enum SocialLinkAnswer {
    REQUESTED
    ACCEPTED
    MAYBE
    DECLINED
    INTERESTED
  }

  enum SocialLinkType {
    INVITE
    FOLLOW
  }

  interface SocialLink {
    id: String!
    type: SocialLinkType!
    message: String
    answer: SocialLinkAnswer!
    updated_at: Date!
    created_at: Date!
  }

  type Following implements SocialLink {
    id: String!
    type: SocialLinkType!
    message: String
    answer: SocialLinkAnswer!
    updated_at: Date!
    created_at: Date!
    recipientId: String!
    recipient: User
  }

  type Follower implements SocialLink {
    id: String!
    type: SocialLinkType!
    message: String
    answer: SocialLinkAnswer!
    updated_at: Date!
    created_at: Date!
    senderId: String!
    sender: User
  }

  type Invite implements SocialLink {
    id: String!
    type: SocialLinkType!
    message: String
    answer: SocialLinkAnswer!
    updated_at: Date!
    created_at: Date!
    eventId: String!
    event: Event
  }
`

export const SocialLinkResolvers = {
  Query: {
    getUserFollowing: (
      parent: void,
      args: { id: string },
      context: { user: IUser }
    ) => {
      const id = args?.id || context.user.id
      return FollowController.findAllBySenderId(id)
    },
    getUserFollowers: (
      parent: void,
      args: { id: string },
      context: { user: IUser }
    ) => {
      const id = args?.id || context.user.id
      return FollowController.findAllByRecipientId(id)
    }
  },
  Mutation: {
    createInvites: (
      parent: void,
      args: IInvitesCreate,
      context: { user: IUser }
    ) => {
      args.senderId = context.user.id
      return InviteController.saveAll(args)
    },
    requestFollow: (
      parent: void,
      args: IFollowRequest,
      context: { user: IUser }
    ) => {
      args.senderId = context.user.id
      return FollowController.saveAll(args)
    }
  },
  SocialLinkType: {
    INVITE: ENotificationType.INVITE,
    FOLLOW: ENotificationType.FOLLOW
  },
  SocialLink: {
    __resolveType(obj: ISocialLink) {
      if (obj.eventId) {
        return ENotificationType.INVITE
      }
      return null // GraphQLError is thrown
    }
  },
  Following: {
    recipient: (parent: ISocialLink) => {
      return UserController.findById(parent.recipientId)
    }
  },
  Follower: {
    sender: (parent: ISocialLink) => {
      return UserController.findById(parent.senderId)
    }
  },
  Invite: {
    event: (parent: IInvite) => {
      if (parent.eventId) {
        return EventController.findById(parent.eventId)
      }
      return null
    }
  }
}
