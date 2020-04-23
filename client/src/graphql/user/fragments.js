import { gql } from 'apollo-boost'

export const userFragment = gql`
  fragment userFields on User {
    id
    username
    name
    email
    description
    avatarUrl
  }
`
