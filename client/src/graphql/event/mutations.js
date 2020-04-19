import { gql } from 'apollo-boost'
import { eventFragment } from '@graphql/event/fragments'

export const CreateEvent = gql`
  ${eventFragment}

  mutation CreateEvent(
    $id: String!
    $ownerId: String!
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

export const UpdateEvent = gql`
  ${eventFragment}

  mutation UpdateEvent($id: String!, $updates: EventUpdateInput!) {
    ...eventFields
  }
`

export const DeleteEvent = gql`
  mutation DeleteEvent($id: String!) {
    deleteEvent(id: $id)
  }
`
