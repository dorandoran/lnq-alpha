const { gql } = require('apollo-server-cloud-functions')

const Event = require('../../databases/store/event')

// Type Definition
exports.typeDef = gql`
  type Event {
    id: String!
    userId: String!
    name: String!
    type: String!
    event_date: String!
    location: String!
    description: String!
    created: String!
    avatarUrl: String
    likes: Int!
    admin: Boolean
    private: Boolean
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
