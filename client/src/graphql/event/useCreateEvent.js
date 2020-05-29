import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { CreateEvent } from '@graphql/event/mutations'

export default function useCreateEvent() {
  const [createEvent] = useMutation(CreateEvent)

  return variables => {
    createEvent({
      variables,
      update: cache => {
        // Only updates if user has checked their events
        try {
          const cachedUser = cache.readFragment({
            id: `User:${variables.ownerId}`,
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
                  }
                }
              }
            `
          })

          variables.__typename = 'Event'
          variables.location.__typename = 'Location'
          variables.avatar.__typename = 'Media'

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
        } catch {}
      }
    })
  }
}
