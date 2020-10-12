import { gql } from '@apollo/client'

export const GetFollowing = gql`
  query GetFollowing {
    user {
      id
      following {
        id
        recipientId
        answer
      }
    }
  }
`
