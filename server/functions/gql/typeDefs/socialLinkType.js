const { gql } = require('apollo-server-cloud-functions')

const Follow = require('../../databases/store/follow')
const Invite = require('../../databases/store/invite')
const User = require('../../databases/store/user')
const Event = require('../../databases/store/user')

exports.typeDef = gql`
  enum SocialLinkType {
    FOLLOWERS
    FOLLOWING
    INVITES
  }

  enum SocialLinkAnswer {
    REQUESTED
    ACCEPTED
    MAYBE
    DECLINED
    INTERESTED
  }

  type SocialLink {
    id: String
    type: SocialLinkType
    recipientId: String
    recipient: User
    senderId: String
    sender: Hit
    answer: SocialLinkAnswer
    updatedAt: Date
  }
`

exports.resolvers = {
  Query: {},
  Mutation: {
    createInvites: (parent, args, context) => {
      args.senderId = context.user.id
      return Invite.saveAllToDb(args)
    },
    requestFollow: (parent, args, context) => {
      args.senderId = context.user.id
      return Follow.saveAllToDb(args)
    }
  },
  SocialLink: {
    recipient: (parent, args, context, info) => {
      return User.findById({ id: parent.recipientId })
    },
    sender: (parent, args, context, info) => {
      if (parent.type === 'INVITES') {
        return Event.findById({ id: parent.senderId })
      }
      return User.findById({ id: parent.senderId })
    }
  }
}
