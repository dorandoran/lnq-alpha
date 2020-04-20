import { gql } from 'apollo-boost'

export const userFragment = gql`
  fragment userFields on User {
    id
    username
    name
    dob
    email
    description
    avatarUrl
    created_at
    events {
      id
      name
    }
  }
`
