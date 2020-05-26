import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { CreateEvent } from '@graphql/event/mutations'

export default function useCreateEvent() {
  const [createEvent] = useMutation(CreateEvent)

  return variables => {
    createEvent({
      variables,
      update: (cache, { data: { createEvent: eventData } }) => {
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
                  owner {
                    id
                    avatarUrl
                  }
                }
              }
            `
          })

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
                  owner {
                    id
                    avatarUrl
                  }
                }
              }
            `,
            data: {
              events: [...cachedUser.events, eventData],
              __typename: 'User'
            }
          })
          // eslint-disable-next-line no-empty
        } catch {}
      }
    })
  }
}
