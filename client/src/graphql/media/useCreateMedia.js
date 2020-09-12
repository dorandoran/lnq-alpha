import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { CreateMedia } from '@graphql/media/mutations.js'

export default function useCreateMedia() {
  const [createMedia] = useMutation(CreateMedia)

  return variables => {
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
  }
}
