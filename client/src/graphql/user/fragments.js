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
    description
    dob
    website
    new
    categories
    numEvents
    numFollowers
    numFollowing
  }
`

export const userFragment = gql`
  fragment userFields on User {
    id
    firstName
    lastName
    username
    description
    avatar {
      id
      uri
    }
  }
`
