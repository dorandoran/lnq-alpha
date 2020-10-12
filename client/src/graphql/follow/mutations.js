import { gql } from '@apollo/client'

export const RequestFollow = gql`
  mutation RequestFollow($recipientIds: [String!]) {
    requestFollow(recipientIds: $recipientIds) {
      id
    }
  }
`
