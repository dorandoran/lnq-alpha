import { gql } from '@apollo/client'
import { eventFragment } from '@graphql/event/fragments'

export const CreateEvent = gql`
  ${eventFragment}

  mutation CreateEvent(
    $id: String!
    $ownerId: String!
    $avatar: AvatarInput!
    $name: String!
    $type: String!
    $date: Date!
    $location: LocationInput!
    $website: String
    $description: String!
    $plusOne: Boolean!
    $isPrivate: Boolean!
    $recipientIds: [String]
    $followIds: [String]
  ) {
    createEvent(
      id: $id
      ownerId: $ownerId
      avatar: $avatar
      name: $name
      type: $type
      date: $date
      location: $location
      website: $website
      description: $description
      plusOne: $plusOne
      isPrivate: $isPrivate
      recipientIds: $recipientIds
      followIds: $followIds
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
