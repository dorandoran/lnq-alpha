import { useMutation } from '@apollo/react-hooks'
import { CreateEvent } from '@graphql/event/mutations'
import { GetUserEvents } from '@graphql/event/queries'

export default function useCreateEvent () {
  const [createEvent] = useMutation(CreateEvent)

  return variables => {
    createEvent({
      variables,
      update: (cache, { data: { createEvent: eventData } }) => {
        // Only update this query if it has been run
        try {
          const data = cache.readQuery({ query: GetUserEvents })
          cache.writeQuery({
            query: GetUserEvents,
            data: { getUserEvents: [...data.getUserEvents, eventData] }
          })
        } catch (e) {
          console.log()
        }
      }
    })
  }
}
