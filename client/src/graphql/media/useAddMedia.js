import useAddEventMedia from '@graphql/media/useAddEventMedia'
import useUpdateUserAvatar from '@graphql/user/useUpdateUserAvatar'
import { OPERATION } from '@util'


const useAddMedia = ({ onCompleted, operation }) => {
  const createMedia = useAddEventMedia({
    onCompleted
  })
  const updateAvatar = useUpdateUserAvatar({
    onCompleted
  })

  if (operation === OPERATION.UPDATE) return updateAvatar
  return createMedia
}

export default useAddMedia