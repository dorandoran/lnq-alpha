const { gql } = require('apollo-server-cloud-functions')

// TODO Remove this when DB is connected
const { events } = require('./eventType')

// Type Definitino
exports.typeDef = gql`
  type User {
    id: Int!
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
      return this.users.find(user => user.id === args.id)
    }
  },
  // Field Resolve
  User: {
    events: (parent, args, context, info) => {
      return events.filter(event => event.userId === parent.id)
    }
  }
}

// Test User Data
exports.users = [
  {
    id: 1,
    username: 'Test',
    firstName: 'Fred',
    lastName: 'tester',
    dob: 'Jan 1, 2000',
    email: 'test@test.com',
    description: 'Sample descriptions',
    avatarUrl: 'www.myurl.com'
  }
]
