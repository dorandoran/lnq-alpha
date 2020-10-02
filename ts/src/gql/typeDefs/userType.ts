import { gql } from 'apollo-server-express'
import { Document } from 'mongoose'
import '../../database/models/User'

import { UserController, ISaveUser } from '../../database/controllers'
import { IUser } from '../../database/interfaces'

export const typeDef = gql`
  type User {
    id: String!
    username: String
    firstName: String!
    lastName: String!
    dob: Date
    email: String!
    description: String
    avatarUrl: String
    website: String
    new: Boolean
    numEvents: Int
    numFollowers: Int
    numFollowing: Int
    categories: [String]
    allowFollowers: Boolean
    created_at: Date
  }

  input UserUpdateInput {
    username: String
    firstName: String
    lastName: String
    dob: Date
    description: String
    avatarUrl: String
    website: String
    new: Boolean
    categories: [String]
    allowFollowers: Boolean
  }
`

export const resolvers = {
  // Global query
  Query: {
    user: (
      obj: void,
      args: { id?: string },
      context: { user: IUser } | null
    ): Promise<Document | null> => {
      const id = args.id || context?.user.id
      return UserController.findById(id)
    }
  },
  Mutation: {
    createUser: (parent: void, args: ISaveUser): Promise<Document | null> => {
      return UserController.save(args)
    },
    updateUser: (parent: void, args: )
  },
  // Field Resolve
  User: {}
}
