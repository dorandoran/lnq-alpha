import { useMutation } from '@apollo/react-hooks'
import { RequestFollow } from '@graphql/follow/mutations.js'

export default function useRequestFollow({ onCompleted }) {
  const [requestFollow] = useMutation(RequestFollow, { onCompleted })

  return variables => {
    requestFollow({
      variables,
      update: () => {}
    })
  }
}
