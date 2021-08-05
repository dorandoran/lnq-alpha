import React from 'react'

import { GetCurrentUserEvents } from '@graphql/user/queries'
import useOverlay from '@context/overlayContext'

import EventList from '@components/shared/itemList'
import { BUCKET } from '@util'

const ProfileEventList = () => {
  const { dispatch, actions } = useOverlay()
  // eslint-disable-next-line quotes
  const noEvents = 'You have no upcoming created events!'

  const handleItemPress = item => {
    dispatch({
      type: actions.modal.open,
      payload: { data: item, type: BUCKET.EVENT }
    })
  }

  return (
    <EventList
      query={GetCurrentUserEvents}
      variables={{ options: { ignoreOld: true } }}
      noDataMessage={noEvents}
      onItemPress={handleItemPress}
      hideAvatar
    />
  )
}

export default ProfileEventList
