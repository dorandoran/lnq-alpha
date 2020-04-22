import { useMutation } from '@apollo/react-hooks'
import { UpdateEvent } from '@graphql/event/mutations.js'

export default function useUpdateEvent () {
  const [updateEvent] = useMutation(UpdateEvent)

  return variables => {
    updateEvent({
      variables,
      update: (cache, { data }) => {
        // TODO Investigate and implement caching
        // console.log(data)
        // console.log(cache)
      }
    })
  }
}
