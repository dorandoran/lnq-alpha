import { gql } from 'apollo-server-express'
import { MediaController } from '../../database/controllers'
import { IMediaCreate, IMediaRemove } from '../../database/interfaces'
import { IUser } from '../../database/interfaces'

export const MediaType = gql`
  type Media {
    id: String!
    ownerId: String!
    linkIds: [String]
    uri: String!
    created_at: Date
  }

  type Avatar {
    id: String!
    uri: String!
  }

  input AvatarInput {
    id: String
    uri: String
  }

  type StorageResponse {
    completed: Boolean!
    error: String
  }

  input MediaInput {
    id: String
    ownerId: String
    linkIds: [String]
    uri: String
    created_at: Date
  }
`

export const MediaResolvers = {
  Query: {
    media: (obj: void, args: { id: string }) => {
      return MediaController.findById(args.id)
    }
  },
  Mutation: {
    createMedia: (
      parent: void,
      args: IMediaCreate,
      context: { user: IUser }
    ) => {
      args.ownerId = context.user.id
      return MediaController.create(args)
    },
    deleteMedia: (parent: void, args: IMediaRemove) => {
      return MediaController.remove(args)
    }
  },
  Media: {}
}
