import { gql } from '@apollo/client'

export const eventFragment = gql`
  fragment eventFields on Event {
    id
    owner {
      id
      username
    }
    avatar {
      id
      uri
    }
    name
    type
    date
    location {
      id
      text
      latitude
      longitude
    }
    description
    created_at
    website
    media {
      id
      uri
      ownerId
    }
    likes
    plusOne
    isPrivate
  }
`

export const userEventFragment = gql`
  fragment userEventFields on Event {
    id
    owner {
      id
      username
    }
    avatar {
      id
      uri
    }
    name
    type
    date
    location {
      id
      text
      latitude
      longitude
    }
    description
    created_at
    website
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
      id
      text
    }
    owner {
      id
      avatar {
        uri
      }
    }
  }
`
