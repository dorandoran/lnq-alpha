import React from 'react'

import useOverlay from '@context/overlayContext'

import ViewContainer from '@components/main/viewContainer'
import Dialog from '@components/overlay/modalDialog'
import Notification from '@components/main/notification'
import EventContainer from '@components/event/eventContainer'
import NewContainer from '@components/new/newContainer'

import { Modal } from 'react-native'
import { BUCKET } from '@util'

const AppModal = () => {
  const { modal, dialog } = useOverlay()

  return (
    <Modal visible={!!modal.type} statusBarTranslucent>
      <ViewContainer>
        {modal.type === BUCKET.NEW && <NewContainer />}
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
