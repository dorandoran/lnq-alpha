import { gql } from 'apollo-boost'

export const RequestFollow = gql`
  mutation RequestFollow($recipientIds: [String!]) {
    requestFollow(recipientIds: $recipientIds) {
      id
    }
  }
`
