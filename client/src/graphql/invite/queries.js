import { gql } from 'apollo-boost'
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
          ... on Event {
            ...searchEventFields
          }
        }
      }
    }
  }
`
