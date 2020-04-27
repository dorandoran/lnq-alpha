import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { DeleteMedia } from '@graphql/media/mutations.js'

export default function useDeleteMedia () {
  const [deleteMedia] = useMutation(DeleteMedia)

  return variables => {
    deleteMedia({
      variables,
      update: cache => {
        if (variables.bucket === 'events') {
          const cachedEvent = cache.readFragment({
            id: `Event:${variables.linkId}`,
            fragment: gql`
              fragment oldMedia on Event {
                id
                media {
                  id
                }
              }
            `
          })

          if (cachedEvent) {
            cache.writeFragment({
              id: `Event:${variables.linkId}`,
              fragment: gql`
                fragment deletedMedia on Event {
                  media {
                    id
                  }
                }
              `,
              data: {
                media: cachedEvent.media.filter(
                  item => item.id !== variables.id
                ),
                __typename: 'Event'
              }
            })
          }
        }
      }
    })
  }
}
