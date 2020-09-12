import gql from 'graphql-tag'

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
      latitude
      longitude
      text
    }
    description
    created_at
    website
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
    owner {
      id
      avatarUrl
    }
  }
`
