// import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { CreateMedia } from '@graphql/media/mutations.js'

export default function useCreateMedia () {
  const [createMedia] = useMutation(CreateMedia)

  return variables => {
    createMedia({
      variables,
      update: (cache, { data: { createMedia: mediaData } }) => {
        // Get event fragment to change from cache
        // const cachedEvent = cache.readFragment({
        //   id: `Event:${variables.linkId}`,
        //   fragment: gql`
        //     fragment media on Event {
        //       id
        //       media {
        //         id
        //       }
        //     }
        //   `
        // })
        // // Write fragment back to cache
        // cache.writeFragment({
        //   id: `Event:${variables.linkId}`,
        //   fragment: gql`
        //     fragment updatedMedia on Event {
        //       id
        //       media {
        //         id
        //       }
        //     }
        //   `,
        //   data: {
        //     media: [...cachedEvent.media, mediaData]
        //   }
        // })
      }
    })
  }
}
