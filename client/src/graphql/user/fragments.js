import { gql } from '@apollo/client'

export const allInfoUserFragment = gql`
  fragment allInfoUserFields on User {
    id
    username
    firstName
    lastName
    email
    avatar {
      id
      uri
    }
    about
    dob
    website
    new
    categories
    numEvents
    numFollowers
    numFollowing
    events {
      id
      avatar {
        id
        uri
      }
      name
      type
      date
      location {
        id
        text
        latitude
        longitude
      }
      description
      created_at
      website
      likes
      plusOne
      isPrivate
    }
    bookmarkEvents {
      id
      name
      avatar {
        id
        uri
      }
      owner {
        id
        username
        avatar {
          id
          uri
        }
      }
      location {
        id
        text
      }
      date
    }
  }
`

export const userFragment = gql`
  fragment userFields on User {
    id
    firstName
    lastName
    username
    about
    avatar {
      id
      uri
    }
    bookmarkEvents {
      id
    }
  }
`
