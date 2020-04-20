import { gql } from 'apollo-boost'

export const CreateMedia = gql`
  mutation CreateMedia(
    $id: String!
    $uri: String!
    $linkId: String!
    $userId: String!
  ) {
    createMedia(id: $id, uri: $uri, linkId: $linkId, userId: $userId) {
      id
      uri
      linkId
      userId
      created_at
    }
  }
`
