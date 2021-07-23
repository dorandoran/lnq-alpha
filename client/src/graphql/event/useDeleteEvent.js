import { useMutation, gql } from '@apollo/client'
import { DeleteEvent } from '@graphql/event/mutations.js'
import useUser from '@context/userContext'

export default function useDeleteEvent({ onCompleted }) {
  const { user: { id } } = useUser()
  const [deleteEvent, { loading }] = useMutation(DeleteEvent, { onCompleted })

  return [
    variables => {
      deleteEvent({
        // variables: { id: string }
        variables,
        update: cache => {
          // Only updates if user has checked their events
          try {
            const cachedUser = cache.readFragment({
              id: `User:${id}`,
              fragment: gql`
                fragment deleteEventUser on User {
                  id
                  events {
                    id
                  }
                }
              `
            })

            cache.writeFragment({
              id: `User:${id}`,
              fragment: gql`
                fragment deletedEvent on User {
                  id
                  events {
                    id
                  }
                }
              `,
              data: {
                events: cachedUser.events.filter(
                  item => item.id !== variables.id
                )
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
