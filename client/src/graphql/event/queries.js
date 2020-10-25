import { gql } from '@apollo/client'
import { eventFragment, userEventFragment } from '@graphql/event/fragments'

export const GetEvent = gql`
  ${eventFragment}

  query GetEvent($id: String!) {
    event(id: $id) {
      ...eventFields
    }
  }
`

export const GetUserEvents = gql`
  ${userEventFragment}

  query GetUserEvents($id: String) {
    getUserEvents(id: $id) {
      ...userEventFields
    }
  }
`
