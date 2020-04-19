import React, { useContext } from 'react'
import { Route } from '@context/routeStore'

import { Modal } from 'react-native'
import EventContainer from '@components/event/eventContainer'
import ViewContainer from '@components/main/viewContainer'
import SpeedBump from '@components/modal/speedBump'

const AppModal = () => {
  const { selected } = useContext(Route.State)

  return (
    <Modal visible={!!selected} statusBarTranslucent>
      <ViewContainer>
        {selected && <EventContainer id={selected.id} />}
      </ViewContainer>
      <SpeedBump />
    </Modal>
  )
}

export default AppModal
