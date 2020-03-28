import { useMutation } from '@apollo/react-hooks'
import { CreateUser } from '@graphql/user/mutations.graphql'

export default function useCreateUser() {
  const [createUser] = useMutation(CreateUser)

  return variables => {
    createUser({ variables })
    // TODO Investigate and implement caching
  }
}
