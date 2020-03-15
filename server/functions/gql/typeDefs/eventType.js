const { gql } = require('apollo-server-cloud-functions')

// Type Definition
exports.typeDef = gql`
  type Event {
    id: Int!
    userId: String!
    name: String!
    type: String!
    event_date: String!
    location: String!
    description: String!
    created: String!
    avatarUrl: String
    likes: Int!
    admin: Boolean!
    private: Boolean
  }
`

// Resolvers
exports.resolvers = {
  // Global Query
  Query: {
    event: (parent, args, context, info) => {
      return this.events.find(event => event.id === args.id)
    }
  },
  // Field Resolve
  Event: {}
}

// Test Event Data
exports.events = [
  {
    id: 1,
    userId: 1,
    name: 'Test Event',
    type: 'Party',
    event_date: 'Jan 1, 2000',
    location: 'Anywhere',
    description: 'Event description',
    created: 'Now',
    avatarUrl: 'www.myurl.com',
    likes: 11,
    admin: true,
    private: false
  }
]
