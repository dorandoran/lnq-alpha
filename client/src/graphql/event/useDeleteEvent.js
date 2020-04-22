import { useMutation } from '@apollo/react-hooks'
import { DeleteEvent } from '@graphql/event/mutations.js'

export default function useDeleteEvent () {
  const [deleteEvent] = useMutation(DeleteEvent)

  return variables => {
    deleteEvent({
      variables,
      update: (cache, { data }) => {
        // TODO Investigate and implement caching
        // console.log(data)
        // console.log(cache)
      }
    })
  }
}
