import { useMutation } from '@apollo/react-hooks'
import { CreateMedia } from '@graphql/media/mutations.js'

export default function useCreateMedia () {
  const [createMedia] = useMutation(CreateMedia)

  return variables => {
    createMedia({
      variables,
      update: (cache, { data }) => {
        // TODO Investigate and implement caching
        // console.log(data)
        // console.log(cache)
      }
    })
  }
}
