import { useMutation } from '@apollo/client'
import { CreateUser } from '@graphql/user/mutations.js'
import { GetCurrentUser } from '@graphql/user/queries.js'

export default function useCreateUser({ onCompleted }) {
  const [createUser, { loading }] = useMutation(CreateUser, { onCompleted })

  return [
    variables =>
      createUser({
        variables,
        update: cache => {
          const newUser = {
            id: variables.id,
            firstName: variables.firstName,
            lastName: variables.lastName,
            username: null,
            email: variables.email,
            avatar: {
              id: null,
              uri: null
            },
            description: null,
            dob: null,
            website: null,
            new: true,
            categories: null,
            numEvents: 0,
            numFollowers: 0,
            numFollowing: 0,
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
