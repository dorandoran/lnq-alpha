const { gql } = require('apollo-server-cloud-functions')

const User = require('../../databases/store/user')
const Event = require('../../databases/store/event')
const Invite = require('../../databases/store/invite')
const Follow = require('../../databases/store/follow')

// Type Definition
exports.typeDef = gql`
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
    new: Boolean
    numEvents: Int
    numFollowers: Int
    numFollowing: Int
    categories: [String]
    events: [Event]
    followers: [SocialLink]
    following: [SocialLink]
    invites: [SocialLink]
    allowFollowers: Boolean
    created_at: Date
  }

  input UserUpdateInput {
    username: String
    firstName: String
    lastName: String
    dob: Date
    description: String
    avatarUrl: String
    website: String
    new: Boolean
    categories: [String]
    allowFollowers: Boolean
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
    },
    updateUser: (parent, args) => {
      return User.update(args)
    }
  },
  // Field Resolve
  User: {
    events: (parent, args, context, info) => {
      return Event.findAllByOwnerId({ ownerId: parent.id })
    },
    invites: (parent, args, context, info) => {
      return Invite.findAllByUserId({ userId: parent.id })
    },
    following: (parent, args, context, info) => {
      const userId = context.user.id
      return Follow.findAllByUserId({ type: 'FOLLOWING', userId })
    },
    followers: (parent, args, context, info) => {
      const userId = context.user.id
      return Follow.findAllByUserId({ type: 'FOLLOWERS', userId })
    }
  }
}
