import { gql } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { CreateMedia } from '@graphql/media/mutations.js'

export default function useCreateMedia({ onCompleted }) {
  const [createMedia, { loading }] = useMutation(CreateMedia, {
    onCompleted
  })

  return [variables => {
    createMedia({
      variables,
      update: (cache, { data: { createMedia: mediaData } }) => {
        // Get event fragment to change from cache
        const cachedEvent = cache.readFragment({
          id: `Event:${variables.linkId}`,
          fragment: gql`
            fragment newMedia on Event {
              id
              media {
                id
                uri
              }
            }
          `
        })

        // Write fragment back to cache
        if (cachedEvent) {
          cache.writeFragment({
            id: `Event:${variables.linkId}`,
            fragment: gql`
              fragment createdMedia on Event {
                media {
                  id
                  uri
                }
              }
            `,
            data: {
              media: [mediaData, ...cachedEvent.media],
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
