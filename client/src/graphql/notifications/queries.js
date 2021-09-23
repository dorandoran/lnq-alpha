import { gql } from '@apollo/client'

export const GetUserNotifications = gql`
  query GetUserNotifications($id: String) {
    getUserNotifications(id: $id) {
    ... on SocialLinkNotification {
      id
      created_at
      type
      socialLink {
        ... on Invite {
          id
          created_at
          event {
            id
            name
          }
          answer
          updated_at
        }
      }
      viewed
      updated_at
      sender {
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