import gql from 'graphql-tag'

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

export const DeleteMedia = gql`
  mutation DeleteMedia($id: String!, $linkId: String!, $bucket: String!) {
    deleteMedia(id: $id, linkId: $linkId, bucket: $bucket) {
      completed
      error
    }
  }
`
