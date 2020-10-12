import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { UpdateEvent } from '@graphql/event/mutations.js'

/**
 * variables {
 *   id: string (Event id, required)
 *   name: string,
 *   type: string,
 *   date: Date,
 *   location: LocationInput,
 *   website: string,
 *   description: string,
 *   plusOne: boolean,
 *   isPrivate: boolean
 * }
 */

export default function useUpdateEvent({ onCompleted }) {
  const [updateEvent, { loading }] = useMutation(UpdateEvent, { onCompleted })

  return [
    variables => {
      updateEvent({
        variables,
        update: (cache, { data: { updateEvent: eventData } }) => {
          const cachedEvent = cache.readFragment({
            id: `Event:${variables.id}`,
            fragment: gql`
              fragment eventUpdate on Event {
                id
              }
            `
          })

          if (cachedEvent) {
            cache.writeFragment({
              id: `Event:${variables.id}`,
              fragment: gql`
                fragment updatedEvent on Event {
                  name
                  type
                  date
                  location {
                    longitude
                    latitude
                    text
                  }
                  website
                  description
                  plusOne
                  isPrivate
                }
              `,
              data: { ...eventData, __typename: 'Event' }
            })
          }
        }
      })
    },
    loading
  ]
}
