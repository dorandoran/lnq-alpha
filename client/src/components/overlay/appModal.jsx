import React, { useEffect } from 'react'
import useOverlay from '@context/overlayContext'

import { Modal } from 'react-native'
import EventContainer from '@components/event/eventContainer'
import ViewContainer from '@components/main/viewContainer'
import Dialog from '@components/overlay/modalDialog'
import Notification from '@components/main/notification'
import { BUCKET } from '@util/constants'

const AppModal = () => {
  const { modal, dialog } = useOverlay()

  return (
    <Modal visible={!!modal.type} statusBarTranslucent>
      <ViewContainer>
        {modal.type === BUCKET.EVENT && (
          <EventContainer id={modal.data.id} isDialogOpen={!!dialog.id} />
        )}
      </ViewContainer>
      <Dialog />
      <Notification />
    </Modal>
  )
}

export default AppModal
