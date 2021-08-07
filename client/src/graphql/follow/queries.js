import { gql } from '@apollo/client'

export const GetFollowing = gql`
  query GetFollowing {
    getUserFollowing {
      id
      answer
      recipient {
        id
        firstName
        lastName
        username
        avatar {
          id
          uri
        }
      }
    }
  }
`

export const GetFollowers = gql`
  query GetFollowers {
    getUserFollowers {
      id
      answer
      sender {
        id
        firstName
        lastName
        username
        avatar {
          id
          uri
        }
      }
    }
  }
`
