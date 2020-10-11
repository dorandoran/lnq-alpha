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
  IFollowRequest
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

  type SocialLink {
    id: String!
    type: SocialLinkType!
    recipientId: String!
    recipient: User
    senderId: String!
    sender: User
    eventId: String
    event: Event
    message: String
    answer: SocialLinkAnswer!
    updated_at: Date!
  }
`

export const SocialLinkResolvers = {
  Query: {},
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
  SocialLink: {
    recipient: (parent: ISocialLink) => {
      return UserController.findById(parent.recipientId)
    },
    sender: (parent: ISocialLink) => {
      return UserController.findById(parent.senderId)
    },
    event: (parent: ISocialLink) => {
      if (parent.eventId) {
        return EventController.findById(parent.eventId)
      }
      return null
    }
  }
}
