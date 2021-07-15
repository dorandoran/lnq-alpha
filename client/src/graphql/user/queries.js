import { gql } from '@apollo/client'
import { allInfoUserFragment } from '@graphql/user/fragments'
import { searchEventFragment } from '@graphql/event/fragments'

export const GetCurrentUser = gql`
  ${allInfoUserFragment}

  query GetCurrentUser {
    user {
      ...allInfoUserFields
    }
  }
`

export const GetCurrentUserEvents = gql`
  ${searchEventFragment}

  query GetCurrentUserEvents($id: String) {
    getUserEvents(id: $id) {
      ...searchEventFields
    }
  }
`
