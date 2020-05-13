import { useMutation } from '@apollo/react-hooks'
import { CreateUser } from '@graphql/user/mutations.js'
import { GetUser } from '@graphql/user/queries.js'

export default function useCreateUser ({ onCompleted }) {
  const [createUser, { loading }] = useMutation(CreateUser, { onCompleted })

  return [
    variables =>
      createUser({
        // variables: { id: string, email: string, password: string, username: string, name: string, dob: string or Date }
        variables,
        update: cache => {
          const newUser = {
            id: variables.id,
            name: variables.name,
            username: variables.username,
            email: variables.email,
            avatarUrl: null,
            description: null,
            __typename: 'User'
          }

          cache.writeQuery({
            query: GetUser,
            variables: { id: variables.id },
            data: { user: newUser }
          })
        }
      }),
    loading
  ]
}
