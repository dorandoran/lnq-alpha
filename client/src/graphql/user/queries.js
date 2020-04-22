import { gql } from 'apollo-boost'
import { userFragment } from '@graphql/user/fragments'

export const GetUser = gql`
  ${userFragment}

  query GetUser($id: String) {
    user(id: $id) {
      ...userFields
    }
  }
`
