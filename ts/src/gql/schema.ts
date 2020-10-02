import { gql } from 'apollo-server-express'
import { merge } from 'lodash'

import { resolvers as dateResolvers } from './typeDefs/dateType'
import {
  resolvers as userResolvers,
  typeDef as UserType
} from './typeDefs/userType'

const OtherType = gql`
  scalar Date

  type Query {
    user(id: String): User
  }

  type Mutation {
    createUser(
      id: String!
      firstName: String!
      lastName: String!
      email: String!
    ): User
  }
`

export const typeDefs = [OtherType, UserType]
export const resolvers = merge(dateResolvers, userResolvers)
