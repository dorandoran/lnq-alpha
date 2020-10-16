import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { UpdateNewUser } from '@graphql/user/mutations.js'

export default function useUpdateUser({ onCompleted }) {
  const [updateNewUser, { loading }] = useMutation(UpdateNewUser, { onCompleted })

  return [
    variables => {
      updateNewUser({
        variables,
        update: (cache, { data: { updateNewUser: data } }) => {
          if (data.user) {
            cache.readFragment({
              id: `User:${variables.id}`,
              fragment: gql`
              fragment newUserUpdate on User {
                id
              }
            `
            })

            cache.writeFragment({
              id: `User:${variables.id}`,
              fragment: gql`
              fragment updatedNewUser on User {
                id
                username
                dob
                website
              }
            `,
              data: { ...data.user }
            })
          }
        }
      })
    },
    loading
  ]
}
