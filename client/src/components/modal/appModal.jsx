import React, { useContext } from 'react'
import { Route } from '@context/routeStore'

import { Modal } from 'react-native'
import EventContainer from '@components/event/eventContainer'

const AppModal = () => {
  const { selected } = useContext(Route.State)

  return (
    <Modal visible={!!selected} statusBarTranslucent>
      {selected && <EventContainer id={selected.id} />}
    </Modal>
  )
}

export default AppModal
