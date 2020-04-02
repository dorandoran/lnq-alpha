import { useMutation } from '@apollo/react-hooks'
import { CreateEvent } from '@graphql/event/mutations.graphql'

export default function useCreateUser() {
  const [createEvent] = useMutation(CreateEvent)

  return variables => {
    createEvent({
      variables,
      update: (cache, { data }) => {
        // TODO Investigate and implement caching
        // console.log(data)
        // console.log(cache)
      }
    })
  }
}
