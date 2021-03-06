import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { ChangeAvatar } from '@graphql/event/mutations.js'

export default function useChangeAvatar({ onCompleted }) {
  const [changeAvatar, { loading }] = useMutation(ChangeAvatar, { onCompleted })

  return [
    variables => {
      changeAvatar({
        // variables: { id: string, mediaId: string }
        variables,
        update: (cache, { data: { updateEvent: avatarData } }) => {
          const cachedEvent = cache.readFragment({
            id: `Event:${variables.id}`,
            fragment: gql`
              fragment changedAvatar on Event {
                id
              }
            `
          })

          const avatarId = avatarData.avatar.id
          const avatar = avatarData.avatar

          if (cachedEvent) {
            cache.writeFragment({
              id: `Event:${variables.id}`,
              fragment: gql`
                fragment changedEventAvatar on Event {
                  avatarId
                  avatar {
                    id
                    uri
                  }
                }
              `,
              data: { avatarId, avatar, __typename: 'Event' }
            })
          }
        }
      })
    },
    loading
  ]
}
