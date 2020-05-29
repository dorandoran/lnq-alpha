const { gql } = require('apollo-server-cloud-functions')

const Follow = require('../../databases/store/follow')
const Invite = require('../../databases/store/invite')
const User = require('../../databases/store/user')
const Event = require('../../databases/store/user')

exports.typeDef = gql`
  enum SocialLinkAnswer {
    REQUESTED
    ACCEPTED
    MAYBE
    DECLINED
    INTERESTED
  }

  type SocialLink {
    id: String
    recipientId: String
    recipient: User
    senderId: String
    sender: Hit
    answer: SocialLinkAnswer
    updated_at: Date
  }
`

exports.resolvers = {
  Query: {},
  Mutation: {
    createInvites: (_, args, context) => {
      args.senderId = context.user.id
      return Invite.saveAllToDb(args)
    },
    requestFollow: (_, args, context) => {
      args.senderId = context.user.id
      return Follow.saveAllToDb(args)
    }
  },
  SocialLink: {
    recipient: parent => {
      return User.findById({ id: parent.recipientId })
    },
    sender: parent => {
      if (parent.type === 'INVITES') {
        return Event.findById({ id: parent.senderId })
      }
      return User.findById({ id: parent.senderId })
    }
  }
}
