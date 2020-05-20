import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { UpdateUser } from '@graphql/user/mutations.js'

/**
 * variables {
 *  id: string (Required)
 *  firstName: string
 *  lastName: string
 *  username: string
 *  dob: Date
 *  description: string
 *  avatarUrl: string
 *  website: string
 *  new: boolean
 *  categories: string[]
 *  }
 * }
 */

export default function useUpdateUser({ onCompleted }) {
  const [updateUser, { loading }] = useMutation(UpdateUser, { onCompleted })

  return [
    variables => {
      updateUser({
        variables,
        update: (cache, { data: { updateUser: userData } }) => {
          cache.readFragment({
            id: `User:${variables.id}`,
            fragment: gql`
              fragment userUpdate on User {
                id
              }
            `
          })

          cache.writeFragment({
            id: `User:${variables.id}`,
            fragment: gql`
              fragment updatedUser on User {
                username
                firstName
                lastName
                dob
                description
                avatarUrl
                website
                new
                categories
              }
            `,
            data: { ...userData }
          })
        }
      })
    },
    loading
  ]
}
