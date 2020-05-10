import { useMutation } from '@apollo/react-hooks'
import { CreateUser } from '@graphql/user/mutations.js'

export default function useCreateUser () {
  const [createUser] = useMutation(CreateUser)

  return variables => createUser({ variables })
}
