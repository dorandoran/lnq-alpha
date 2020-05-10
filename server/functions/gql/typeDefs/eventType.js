const { gql } = require('apollo-server-cloud-functions')

const User = require('../../databases/store/user')
const Event = require('../../databases/store/event')
const Media = require('../../databases/store/media')
const Invite = require('../../databases/store/invite')

// Type Definition
const typeDef = gql`
  type Event {
    id: String!
    ownerId: String
    owner: User
    avatarId: String
    avatar: Media
    name: String
    type: String
    date: Date
    location: Location
    url: String
    description: String
    created_at: Date
    media: [Media]
    likes: Int
    plusOne: Boolean
    isPrivate: Boolean
    invites: [Invite]
  }

  input EventUpdateInput {
    name: String
    avatarId: String
    type: String
    date: Date
    location: LocationInput
    url: String
    description: String
    plusOne: Boolean
    isPrivate: Boolean
  }
`

// Resolvers
const resolvers = {
  // Global Query
  Query: {
    event: (parent, args, context, info) => {
      return Event.findById(args)
    },
    getUserEvents: (parent, args, context, info) => {
      const ownerId = args.id || context.user.id
      return Event.findAllByOwnerId({ ownerId })
    }
  },
  // Mutations
  Mutation: {
    createEvent: (parent, args) => {
      return Event.saveToStore(args)
    },
    updateEvent: (parent, args) => {
      return Event.update(args)
    },
    deleteEvent: (parent, args, context) => {
      // TODO: Add security - check userId matches
      // context = { email: string, name: string, username: string, id: string... }
      return Event.deleteFromStore(args)
    }
  },
  // Field Resolve
  Event: {
    owner: (parent, args, context, info) => {
      return User.findById({ id: parent.ownerId })
    },
    avatar: (parent, args, context, info) => {
      return Media.findById({ id: parent.avatarId })
    },
    media: ({ id, avatarId }, args, context, info) => {
      return Media.findAllByLinkId({ linkId: id, avatarId: avatarId })
    },
    invites: (parent, args, context, info) => {
      return Invite.findAllByEventId({ eventId: parent.id })
    }
  }
}

module.exports = { typeDef, resolvers }
