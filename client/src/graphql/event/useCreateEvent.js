import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { CreateEvent } from '@graphql/event/mutations'

export default function useCreateEvent({ onCompleted }) {
  const [createEvent, { loading }] = useMutation(CreateEvent, { onCompleted })

  return [variables => {
    createEvent({
      variables,
      update: (cache, { data: { createEvent: eventData } }) => {
        // Only updates if user has checked their events
        try {
          const cachedUser = cache.readFragment({
            id: `User:${eventData.ownerId}`,
            fragment: gql`
              fragment userBeforeNewEvent on User {
                id
                events {
                  id
                  name
                  date
                  avatar {
                    id
                    uri
                  }
                  location {
                    text
                    latitude
                    longitude
                  }
                }
              }
            `
          })

          variables.ownerId = eventData.ownerId
          variables.__typename = 'Event'
          variables.avatar.__typename = 'Avatar'

          cache.writeFragment({
            id: `User:${variables.ownerId}`,
            fragment: gql`
              fragment userAfterNewEvent on User {
                events {
                  id
                  name
                  date
                  avatar {
                    id
                    uri
                  }
                  location {
                    text
                    latitude
                    longitude
                  }
                }
              }
            `,
            data: {
              events: [...cachedUser.events, variables],
              __typename: 'User'
            }
          })
          // eslint-disable-next-line no-empty
        } catch { }
      }
    })
  },
    loading
  ]
}
