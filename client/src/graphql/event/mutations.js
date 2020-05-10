import { gql } from 'apollo-boost'
import { eventFragment } from '@graphql/event/fragments'

export const CreateEvent = gql`
  ${eventFragment}

  mutation CreateEvent(
    $id: String!
    $ownerId: String!
    $avatarId: String
    $name: String!
    $type: String!
    $date: Date!
    $location: LocationInput!
    $url: String
    $description: String!
    $plusOne: Boolean!
    $isPrivate: Boolean!
  ) {
    createEvent(
      id: $id
      ownerId: $ownerId
      avatarId: $avatarId
      name: $name
      type: $type
      date: $date
      location: $location
      url: $url
      description: $description
      plusOne: $plusOne
      isPrivate: $isPrivate
    ) {
      ...eventFields
    }
  }
`

export const ChangeAvatar = gql`
  mutation ChangeAvatar($id: String!, $mediaId: String!) {
    updateEvent(id: $id, updates: { avatarId: $mediaId }) {
      id
      avatar {
        id
        uri
      }
    }
  }
`

export const UpdateEvent = gql`
  ${eventFragment}

  mutation UpdateEvent($id: String!, $updates: EventUpdateInput!) {
    updateEvent(id: $id, updates: $updates) {
      ...eventFields
    }
  }
`

export const DeleteEvent = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id)
  }
`
