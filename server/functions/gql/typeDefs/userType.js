const { gql } = require('apollo-server-cloud-functions')

const User = require('../../databases/store/user')
const Event = require('../../databases/store/event')
const Invite = require('../../databases/store/invite')

// Type Definition
exports.typeDef = gql`
  type User {
    id: String!
    username: String!
    name: String!
    dob: Date!
    email: String!
    description: String
    avatarUrl: String
    events: [Event]
    invites: [Invite]
    created_at: Date
  }
`

// Resolvers
exports.resolvers = {
  // Global query
  Query: {
    user: (parent, args, context, info) => {
      return User.findById(args)
    }
  },
  // Mutations
  Mutation: {
    createUser: (parent, args) => {
      return User.saveToStore(args)
    }
  },
  // Field Resolve
  User: {
    events: (parent, args, context, info) => {
      return Event.findAllByOwnerId({ ownerId: parent.id })
    },
    invites: (parent, args, context, info) => {
      return Invite.findAllByUserId({ userId: parent.id })
    }
  }
}
