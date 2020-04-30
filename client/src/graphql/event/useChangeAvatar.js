import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { ChangeAvatar } from '@graphql/event/mutations.js'

export default function useUpdateEvent ({ onCompleted }) {
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
              data: {
                // media: [
                //   cachedEvent.media.find(item => item.id === variables.mediaId),
                //   ...cachedEvent.media.filter(
                //     item => item.id !== variables.mediaId
                //   )
                // ],
                avatarId: avatarData.avatar.id,
                avatar: avatarData.avatar,
                __typename: 'Event'
              }
            })
          }
        }
      })
    },
    loading
  ]
}
