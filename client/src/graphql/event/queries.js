import { gql } from 'apollo-boost'
import { eventFragment } from '@graphql/event/fragments'

export const GetEvent = gql`
  ${eventFragment}

  query GetEvent($id: String!) {
    event(id: $id) {
      ...eventFields
    }
  }
`
