import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { UpdateUserAvatar } from '@graphql/user/mutations.js'

export default function useUpdateUserAvatar({ onCompleted }) {
  const [updateAvatar, { loading }] = useMutation(UpdateUserAvatar, { onCompleted })

  return [
    variables => {
      updateAvatar({
        variables,
        update: (cache, { data: { updateUserAvatar: avatarData } }) => {
          cache.readFragment({
            id: `User:${variables.id}`,
            fragment: gql`
              fragment userAvatarUpdate on User {
                id
              }
            `
          })

          cache.writeFragment({
            id: `User:${variables.id}`,
            fragment: gql`
              fragment updatedAvatarUser on User {
                id
                avatar {
                  id
                  uri
                }
              }
            `,
            data: { ...avatarData }
          })
        }
      })
    },
    loading
  ]
}