import gql from 'graphql-tag'
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

export const UpdateUser = gql`
  ${allInfoUserFragment}

  mutation UpdateUser($id: String!, $updates: UserUpdateInput!) {
    updateUser(id: $id, updates: $updates) {
      ...allInfoUserFields
    }
  }
`
