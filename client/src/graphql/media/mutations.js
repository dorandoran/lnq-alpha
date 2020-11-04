import { gql } from '@apollo/client'

export const CreateMedia = gql`
  mutation CreateMedia(
    $linkId: String!
    $type: String!
    $image: Upload!
  ) {
    createMedia(linkId: $linkId, type: $type, image: $image) {
      id
      uri
    }
  }
`

export const DeleteMedia = gql`
  mutation DeleteMedia($id: String!, $linkId: String!, $type: String!) {
    deleteMedia(id: $id, linkId: $linkId, type: $type) {
      completed
      error
    }
  }
`
