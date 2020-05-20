const { gql } = require('apollo-server-cloud-functions')

const User = require('../../databases/store/user')
const Event = require('../../databases/store/event')
const Invite = require('../../databases/store/invite')

// Type Definition
exports.typeDef = gql`
  type UserPreference {
    new: Boolean!
    categories: [String]
  }

  input UserPreferenceInput {
    new: Boolean
    categories: [String]!
  }

  type User {
    id: String!
    username: String
    firstName: String!
    lastName: String!
    dob: Date
    email: String!
    description: String
    avatarUrl: String
    website: String
    preferences: UserPreference
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
      const id = args.id || context.user.id
      return User.findById({ id })
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
