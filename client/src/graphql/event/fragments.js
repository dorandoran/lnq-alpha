import { gql } from 'apollo-boost'

export const eventFragment = gql`
  fragment eventFields on Event {
    id
    owner {
      id
      username
    }
    avatarId
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
      userId
    }
    likes
    plusOne
    isPrivate
  }
`

export const searchEventFragment = gql`
  fragment searchEventFields on Event {
    id
    name
    date
    avatar {
      id
      uri
    }
    location {
      text
    }
  }
`
