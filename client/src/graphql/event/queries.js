import gql from 'graphql-tag'
import { eventFragment } from '@graphql/event/fragments'

export const GetEvent = gql`
  ${eventFragment}

  query GetEvent($id: String!) {
    event(id: $id) {
      ...eventFields
    }
  }
`

export const GetUserEvents = gql`
  ${eventFragment}

  query GetUserEvents($id: String) {
    getUserEvents(id: $id) {
      ...eventFields
    }
  }
`
