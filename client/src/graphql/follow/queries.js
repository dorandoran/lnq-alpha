import { gql } from 'apollo-boost'

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
