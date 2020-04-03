const { gql } = require('apollo-server-cloud-functions')

const Event = require('../../databases/store/event')

// Type Definition
exports.typeDef = gql`
  type Event {
    id: String!
    userId: String!
    name: String!
    type: String!
    date: Date!
    location: String!
    description: String!
    created_at: Date!
    media: [Media]
    likes: Int!
    plusOne: Boolean
    isPrivate: Boolean
  }
`

// Resolvers
exports.resolvers = {
  // Global Query
  Query: {
    event: (parent, args, context, info) => {
      return Event.findById(args)
    }
  },
  // Mutations
  Mutation: {
    createEvent: (parent, args) => {
      return Event.saveToDb(args)
    }
  },
  // Field Resolve
  Event: {}
}
