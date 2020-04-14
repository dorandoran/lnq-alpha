const { gql } = require('apollo-server-cloud-functions')

const Invite = require('../../databases/store/invite')
const User = require('../../databases/store/user')
const Event = require('../../databases/store/user')

exports.typeDef = gql`
  type Invite {
    id: String!
    recipientId: String!
    recipient: User
    eventId: String!
    event: Event
    answer: String!
  }
`

exports.resolvers = {
  Query: {},
  Mutation: {
    createInvites: (parent, args) => {
      return Invite.saveAllToDb(args)
    }
  },
  Invite: {
    recipient: (parent, args, context, info) => {
      return User.findById({ id: parent.recipientId })
    },
    event: (parent, args, context, info) => {
      return Event.findById({ id: parent.eventId })
    }
  }
}
