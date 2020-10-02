const { gql } = require('apollo-server-express')

const Follow = require('../../databases/controllers/follow')
const Invite = require('../../databases/controllers/invite')
const User = require('../../databases/controllers/user')
const Event = require('../../databases/controllers/event')

exports.typeDef = gql`
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

exports.resolvers = {
  Query: {},
  Mutation: {
    createInvites: (_, args, context) => {
      args.senderId = context.user.id
      return Invite.saveAllToStore(args)
    },
    requestFollow: (_, args, context) => {
      args.senderId = context.user.id
      return Follow.saveAllToStore(args)
    }
  },
  SocialLink: {
    recipient: parent => {
      return User.findById({ id: parent.recipientId })
    },
    sender: parent => {
      return User.findById({ id: parent.senderId })
    },
    event: parent => {
      if (parent.type === 'INVITE') {
        return Event.findById({ id: parent.eventId })
      }
      return null
    }
  }
}
