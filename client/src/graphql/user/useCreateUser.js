import { useMutation } from '@apollo/react-hooks'
import { CreateUser } from '@graphql/user/mutations.js'
import { GetCurrentUser } from '@graphql/user/queries.js'

export default function useCreateUser({ onCompleted }) {
  const [createUser, { loading }] = useMutation(CreateUser, { onCompleted })

  return [
    variables =>
      createUser({
        // variables: { id: string, email: string, password: string, firstName: string, lastName: string}
        variables,
        update: cache => {
          const newUser = {
            id: variables.id,
            firstName: variables.firstName,
            lastName: variables.lastName,
            username: null,
            email: variables.email,
            avatarUrl: null,
            description: null,
            dob: null,
            website: null,
            preferences: {
              new: true,
              categories: null,
              __typename: 'UserPreference'
            },
            __typename: 'User'
          }

          cache.writeQuery({
            query: GetCurrentUser,
            variables: { id: variables.id },
            data: { user: newUser }
          })
        }
      }),
    loading
  ]
}
