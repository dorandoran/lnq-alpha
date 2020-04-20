import { gql } from 'apollo-boost'
import { userFragment } from '@graphql/user/fragments'

export const CreateUser = gql`
  ${userFragment}

  mutation CreateUser(
    $id: String!
    $username: String!
    $name: String!
    $dob: Date!
    $email: String!
  ) {
    createUser(
      id: $id
      username: $username
      name: $name
      dob: $dob
      email: $email
    ) {
      ...userFields
    }
  }
`
