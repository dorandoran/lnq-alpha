import { gql } from '@apollo/client'

export const RequestFollow = gql`
  mutation RequestFollow($recipientIds: [String!]) {
    createInvites(type: FOLLOW, recipientIds: $recipientIds) {
      id
    }
  }
`
