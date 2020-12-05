import { gql } from '@apollo/client'

export const GetEventComments = gql`
  query GetEventComments($id: String!) {
    event(id: $id) {
      id
      comments {
        id
        text
        created_at
        owner {
          id
          username
          avatar {
            id
            uri
          }
        }
      }
    }
  }
`

export const GetUserInbox = gql`
  query GetUserInbox {
    user {
      id
      inbox {
        id
        linkIds
      }
    }
  }
`