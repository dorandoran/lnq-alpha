import React from 'react'
import { useRouteState } from '@hooks/useRoute'

import { Modal } from 'react-native'
import EventContainer from '@components/event/eventContainer'
import ViewContainer from '@components/main/viewContainer'
import Dialog from '@components/modal/eventDialog'
import Notification from '@components/main/notification'

const AppModal = () => {
  const { selected } = useRouteState()

  return (
    <Modal visible={!!selected} statusBarTranslucent>
      <ViewContainer>
        {selected && <EventContainer id={selected.id} />}
      </ViewContainer>
      <Dialog />
      <Notification />
    </Modal>
  )
}

export default AppModal
