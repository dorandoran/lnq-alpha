import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { ChangeAvatar } from '@graphql/event/mutations.js'

export default function useChangeAvatar ({ onCompleted }) {
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
              fragment eventAvatarUpdate on Event {
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
                fragment updatedEventAvatar on Event {
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
