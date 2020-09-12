import gql from 'graphql-tag'

export const RequestFollow = gql`
  mutation RequestFollow($recipientIds: [String!]) {
    createInvites(type: FOLLOW, recipientIds: $recipientIds) {
      id
    }
  }
`
