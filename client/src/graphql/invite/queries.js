import gql from 'graphql-tag'
import { searchEventFragment } from '@graphql/event/fragments'

export const GetRSVP = gql`
  ${searchEventFragment}

  query GetRSVP {
    user {
      id
      invites {
        id
        answer
        sender {
          id
          avatarUrl
        }
        event {
          ... on Event {
            ...searchEventFields
          }
        }
      }
    }
  }
`
