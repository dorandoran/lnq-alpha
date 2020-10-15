import { gql } from '@apollo/client'
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
          avatar {
            uri
          }
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
