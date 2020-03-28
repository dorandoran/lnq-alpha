const { gql } = require('apollo-server-cloud-functions')

const User = require('../../databases/store/user')
const Event = require('../../databases/store/event')

// Type Definition
exports.typeDef = gql`
  type User {
    id: String!
    username: String!
    firstName: String!
    lastName: String!
    dob: String!
    email: String!
    description: String
    avatarUrl: String
    events: [Event]
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
      return User.saveToDb(args)
    }
  },
  // Field Resolve
  User: {
    events: (parent, args, context, info) => {
      return Event.findByUserId({ userId: parent.id })
    }
  }
}
