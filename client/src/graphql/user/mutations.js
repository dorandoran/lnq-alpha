import { gql } from '@apollo/client'
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

export const UpdateUserAvatar = gql`
  mutation UpdateUserAvatar($id: String, $image: Upload!) {
    updateUserAvatar(id: $id, image: $image) {
      id
      uri
    }
  }
`

export const UpdateNewUser = gql`
  mutation UpdateNewUser($id: String, $username: String!, $dob: Date, $website: String) {
    updateNewUser(id: $id, username: $username, dob: $dob, website: $website) {
      response
      user {
        id
        username
        dob
        website
      }
    }
  }
`