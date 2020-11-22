import { gql, useMutation } from '@apollo/client'
import { AddComment } from '@graphql/message/mutations'
import useUser from '@context/userContext'

export default function useAddComment({ onCompleted }) {
  const user = useUser()
  const [addComment, { loading }] = useMutation(AddComment, { onCompleted })

  return [
    variables => {
      addComment({
        variables,
        update: (cache, { data: { addComment: commentData } }) => {
          const cachedEvent = cache.readFragment({
            id: `Event:${variables.eventId}`,
            fragment: gql`
              fragment commentBeforeSave on Event {
                id
                comments {
                  id
                }
              }
            `
          })

          const newComment = {
            ...commentData,
            owner: { id: user.id, avatar: user.avatar }
          }

          cache.writeFragment({
            id: `Event:${variables.eventId}`,
            fragment: gql`
              fragment commentAfterSave on Event {
                id
                comments {
                  id
                }
              }
            `,
            data: {
              comments: [...cachedEvent.comments, newComment]
            }
          })
        }
      })
    },
    loading
  ]
}
