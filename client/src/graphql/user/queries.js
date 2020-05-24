import { gql } from 'apollo-boost'
import { allInfoUserFragment } from '@graphql/user/fragments'

export const GetCurrentUser = gql`
  ${allInfoUserFragment}

  query GetCurrentUser($id: String) {
    user(id: $id) {
      ...allInfoUserFields
    }
  }
`
