const { gql } = require('apollo-server-express')

const User = require('../../databases/controllers/user')
const Event = require('../../databases/controllers/event')
const Media = require('../../databases/controllers/media')
const Invite = require('../../databases/controllers/invite')

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
    website: String
    description: String
    created_at: Date
    media: [Media]
    likes: Int
    plusOne: Boolean
    isPrivate: Boolean
    invites: [SocialLink]
  }

  input AvatarInput {
    id: String
    userId: String
    linkId: [String]
    uri: String
    created_at: Date
  }

  input EventUpdateInput {
    name: String
    avatarId: String
    type: String
    date: Date
    location: LocationInput
    website: String
    description: String
    plusOne: Boolean
    isPrivate: Boolean
  }
`

// Resolvers
const resolvers = {
  // Global Query
  Query: {
    event: (_, args) => {
      return Event.findById(args)
    },
    getUserEvents: (_, args, context) => {
      const ownerId = args.id || context.user.id
      return Event.findAllByOwnerId({ ownerId })
    }
  },
  // Mutations
  Mutation: {
    createEvent: (_, args, context) => {
      args.userId = context.user.id
      return Event.saveToStore(args)
    },
    updateEvent: (_, args) => {
      return Event.update(args)
    },
    deleteEvent: (_, args) => {
      // TODO: Add security - check userId matches
      // context = { email: string, name: string, username: string, id: string... }
      return Event.deleteFromStore(args)
    }
  },
  // Field Resolve
  Event: {
    owner: parent => {
      return User.findById({ id: parent.ownerId })
    },
    avatar: parent => {
      return Media.findById({ id: parent.avatarId })
    },
    media: ({ id, avatarId }) => {
      return Media.findAllByLinkId({ linkId: id, avatarId: avatarId })
    },
    invites: parent => {
      return Invite.findAllByEventId({ eventId: parent.id })
    }
  }
}

module.exports = { typeDef, resolvers }
