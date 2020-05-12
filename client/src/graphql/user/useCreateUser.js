import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { CreateUser } from '@graphql/user/mutations.js'

export default function useCreateUser () {
  const [createUser, { loading }] = useMutation(CreateUser)

  return [
    variables =>
      createUser({
        // variables: { email: string, password: string, username: string, name: string, dob: string or Date }
        variables,
        update: (cache, { data: { createUser } }) => {
          cache.writeFragment({
            id: `User:${createUser.id}`,
            fragment: gql`
              fragment newUser on User {
                id
              }
            `,
            data: { ...createUser },
            __typename: 'User'
          })
        }
      }),
    loading
  ]
}
