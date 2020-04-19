import { gql } from 'apollo-boost'

export const eventFragment = gql`
  fragment eventFields on Event {
    id
    owner {
      id
      username
    }
    name
    type
    date
    location {
      latitude
      longitude
      text
    }
    description
    created_at
    url
    media {
      id
      uri
    }
    likes
    plusOne
    isPrivate
  }
`
