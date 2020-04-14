const { gql } = require('apollo-server-cloud-functions')

const Event = require('../../databases/store/event')
const Media = require('../../databases/store/media')
const Invite = require('../../databases/store/invite')

// Type Definition
exports.typeDef = gql`
  type Event {
    id: String!
    ownerId: String!
    owner: User
    name: String!
    type: String!
    date: Date!
    location: String!
    description: String!
    url: String
    created_at: Date!
    media: [Media]
    likes: Int!
    plusOne: Boolean
    isPrivate: Boolean
    invites: [Invite]
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
  Event: {
    media: (parent, args, context, info) => {
      return Media.findAllByLinkId({ linkId: parent.id })
    },
    invites: (parent, args, context, info) => {
      return Invite.findAllByEventId({ eventId: parent.id })
    }
  }
}
