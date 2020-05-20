import { gql } from 'apollo-boost'

export const allInfoUserFragment = gql`
  fragment allInfoUserFields on User {
    id
    username
    firstName
    lastName
    email
    avatarUrl
    description
    dob
    website
    new
    categories
  }
`

export const userFragment = gql`
  fragment userFields on User {
    id
    username
    email
    description
    avatarUrl
  }
`
