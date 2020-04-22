import React, { useContext } from 'react'
import { Route } from '@context/routeStore'

import { Modal } from 'react-native'
import EventContainer from '@components/event/eventContainer'
import ViewContainer from '@components/main/viewContainer'
import Dialog from '@components/modal/eventDialog'

const AppModal = () => {
  const { selected } = useContext(Route.State)

  return (
    <Modal visible={!!selected} statusBarTranslucent>
      <ViewContainer>
        {selected && <EventContainer id={selected.id} />}
      </ViewContainer>
      <Dialog />
    </Modal>
  )
}

export default AppModal