import React from 'react'

import useOverlay from '@context/overlayContext'

import ViewContainer from '@components/main/viewContainer'
import Notification from '@components/main/notification'
import EventContainer from '@components/event/eventContainer'
import NewContainer from '@components/new/newContainer'

import { Modal } from 'react-native'
import { BUCKET } from '@util'

const AppModal = () => {
  const { modal } = useOverlay()

  return (
    <Modal visible={!!modal.type} statusBarTranslucent>
      <ViewContainer>
        {modal.type === BUCKET.NEW && <NewContainer />}
        {modal.type === BUCKET.EVENT && <EventContainer id={modal.data.id} />}
      </ViewContainer>
      <Notification />
    </Modal>
  )
}

export default AppModal
