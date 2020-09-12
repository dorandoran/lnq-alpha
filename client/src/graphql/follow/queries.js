import gql from 'graphql-tag'

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
