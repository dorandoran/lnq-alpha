import { gql } from 'apollo-server-express'
import { EventController, UserController } from '../../database/controllers'
import {
  IComment,
  IMessage,
  IAddComment,
  IUser,
  ICreateMessage
} from '../../database/interfaces'

export const MessageType = gql`
  type Message {
    id: String!
    ownerId: String
    owner: User
    linkIds: String
    links: [Hit]
    text: String
    created_at: Date
    updated_at: Date
  }
`

export const MessageResolvers = {
  Query: {},
  Mutation: {
    addComment: (parent: void, args: IAddComment, context: { user: IUser }) => {
      args.ownerId = context.user.id
      return EventController.addComment(args)
    },
    createMessage: (
      parent: void,
      args: ICreateMessage,
      context: { user: IUser }
    ) => {
      args.senderId = context.user.id
      return UserController.createMessage(args)
    }
  },
  Message: {
    owner: (parent: IComment) => {
      return UserController.findById(parent.ownerId)
    },
    links: ({ linkIds }: IMessage) => {
      if (linkIds.length === 1) {
        return EventController.findById(linkIds[0])
      }
      return UserController.findByLinkIds(linkIds)
    }
  }
}
