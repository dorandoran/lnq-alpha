import { gql } from 'apollo-server-express'
import { EventController, UserController } from '../../database/controllers'
import { IComment, IAddComment, IUser } from '../../database/interfaces'

export const MessageType = gql`
  type Message {
    id: String!
    ownerId: String
    owner: User
    linkId: String
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
    }
  },
  Message: {
    owner: (parent: IComment) => {
      return UserController.findById(parent.ownerId)
    }
  }
}
