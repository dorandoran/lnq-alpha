import { gql } from 'apollo-server-express'
import {
  EventController,
  UserController,
  MediaController,
  InviteController
} from '../../database/controllers'
import { IEvent, IEventCreate, IEventUpdate } from '../../database/interfaces'
import { IUser } from '../../database/interfaces/User'

export const EventType = gql`
  type Event {
    id: String!
    ownerId: String
    owner: User
    avatar: Avatar
    name: String
    type: String
    date: Date
    location: Location
    website: String
    description: String
    updated_at: Date
    created_at: Date
    media: [Media]
    likes: [String]
    numLikes: Int
    plusOne: Boolean
    isPrivate: Boolean
    invites: [SocialLink]
  }

  type Avatar {
    id: String
    uri: String
  }

  input EventUpdateInput {
    name: String
    type: String
    date: Date
    location: LocationInput
    website: String
    description: String
    plusOne: Boolean
    isPrivate: Boolean
  }

  input AvatarInput {
    id: String
    uri: String
  }
`

export const EventResolvers = {
  Query: {
    event: (obj: void, args: { id: string }) => {
      return EventController.findById(args.id)
    },
    getUserEvents: (
      obj: void,
      args: { id?: string },
      context: { user: IUser } | null
    ) => {
      const id = args.id || context?.user.id
      return EventController.findAllByOwnerId(id)
    }
  },

  Mutation: {
    createEvent: (parent: void, args: IEventCreate) => {
      return EventController.create(args)
    },
    updateEvent: (parent: void, args: IEventUpdate) => {
      return EventController.update(args)
    },
    deleteEvent: (parent: void, args: { id: string }) => {
      return EventController.remove(args.id)
    }
  },

  Event: {
    owner: (parent: IEvent) => {
      return UserController.findById(parent.ownerId)
    },
    avatar: (parent: IEvent) => {
      return MediaController.findById(parent.avatar.id)
    },
    media: ({ id, avatar }: IEvent) => {
      return MediaController.findAllByLinkId({ id, avatarId: avatar.id })
    },
    invites: (parent: IEvent) => {
      return InviteController.findAllByEventId(parent.id)
    }
  }
}
