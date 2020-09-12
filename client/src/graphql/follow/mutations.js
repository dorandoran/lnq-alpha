import gql from 'graphql-tag'

export const RequestFollow = gql`
  mutation RequestFollow($recipientIds: [String!]) {
    requestFollow(recipientIds: $recipientIds) {
      id
    }
  }
`
