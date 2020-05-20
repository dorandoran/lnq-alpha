import { gql } from 'apollo-boost'
import { allInfoUserFragment } from '@graphql/user/fragments'

export const CreateUser = gql`
  ${allInfoUserFragment}

  mutation CreateUser(
    $id: String!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    createUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      ...allInfoUserFields
    }
  }
`
