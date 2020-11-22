import { gql } from '@apollo/client'

export const AddComment = gql`
  mutation AddComment($eventId: String!, $comment: String!) {
    addComment(eventId: $eventId, comment: $comment) {
      id
      created_at
    }
  }
`
