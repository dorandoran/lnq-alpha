import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { DeleteMedia } from '@graphql/media/mutations.js'
import { BUCKET } from '@util'

export default function useDeleteMedia({ onCompleted }) {
  const [deleteMedia, { loading }] = useMutation(DeleteMedia, { onCompleted })

  return [
    variables => {
      deleteMedia({
        variables,
        update: cache => {
          if (variables.bucket === BUCKET.EVENT) {
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
    },
    loading
  ]
}
