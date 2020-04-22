import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { CreateMedia } from '@graphql/media/mutations.js'

export default function useCreateMedia () {
  const [createMedia] = useMutation(CreateMedia)

  return variables => {
    createMedia({
      variables,
      update: (cache, { data: { createMedia: mediaData } }) => {
        // Get event fragment to change from cache
        const cachedEvent = cache.readFragment({
          id: `Event:${variables.linkId}`,
          fragment: gql`
            fragment media on Event {
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
              fragment updatedMedia on Event {
                media {
                  id
                  uri
                }
              }
            `,
            data: {
              media: [...cachedEvent.media, mediaData],
              __typename: 'Event'
            }
          })
        }
      }
    })
  }
}
