import React from 'react'
import useOverlay from '@context/overlayContext'

import { Modal } from 'react-native'
import EventContainer from '@components/event/eventContainer'
import ViewContainer from '@components/main/viewContainer'
import Dialog from '@components/overlay/modalDialog'
import Notification from '@components/main/notification'
import { EVENT_CONST } from '@util/constants'

const AppModal = () => {
  const { modal } = useOverlay()

  return (
    <Modal visible={!!modal.type} statusBarTranslucent>
      <ViewContainer>
        {modal.type === EVENT_CONST && <EventContainer id={modal.data.id} />}
      </ViewContainer>
      <Dialog />
      <Notification />
    </Modal>
  )
}

export default AppModal
