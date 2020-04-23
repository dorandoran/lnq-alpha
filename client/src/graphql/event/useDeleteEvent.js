import { useMutation } from '@apollo/react-hooks'
import { DeleteEvent } from '@graphql/event/mutations.js'
import { GetUserEvents } from '@graphql/event/queries'

export default function useDeleteEvent () {
  const [deleteEvent] = useMutation(DeleteEvent)

  return variables => {
    deleteEvent({
      variables,
      update: cache => {
        const data = cache.readQuery({ query: GetUserEvents })
        const newData = {
          getUserEvents: data.getUserEvents.filter(
            event => event.id !== variables.id
          )
        }
        cache.writeQuery({ query: GetUserEvents, data: newData })
      }
    })
  }
}
