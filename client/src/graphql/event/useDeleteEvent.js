import { useMutation } from '@apollo/react-hooks'
import { DeleteEvent } from '@graphql/event/mutations.js'
import { GetUserEvents } from '@graphql/event/queries'

export default function useDeleteEvent ({ onCompleted }) {
  const [deleteEvent, { loading }] = useMutation(DeleteEvent, { onCompleted })

  return [
    variables => {
      deleteEvent({
        // variables: { id: string }
        variables,
        update: cache => {
          // Save for when getting user events is used
          // const data = cache.readQuery({ query: GetUserEvents })
          // const newData = {
          //   getUserEvents: data.getUserEvents.filter(
          //     event => event.id !== variables.id
          //   )
          // }
          // cache.writeQuery({ query: GetUserEvents, data: newData })
        }
      })
    },
    loading
  ]
}
