import { gql } from 'apollo-boost'

export const RequestFollow = gql`
  mutation RequestFollow($recipientIds: [String!]) {
    createInvites(type: FOLLOW, recipientIds: $recipientIds) {
      id
    }
  }
`
