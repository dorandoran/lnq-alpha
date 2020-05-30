import React from 'react'
import PropTypes from 'prop-types'
import size from 'lodash/size'

import useUpdateUser from '@graphql/user/useUpdateUser'
import useUser from '@context/userContext'
import useOverlay from '@context/overlayContext'
import useNotification from '@hooks/useNotification'

import { StyleSheet, View } from 'react-native'
import ComponentMap, {
  componentMap
} from '@components/new/utilComponents/newComponentMap'
import Header from '@components/new/utilComponents/newComponentHeader'
import { ADJUSTED_HEIGHT, SCREEN_WIDTH } from '@util'

export const actions = {
  next: 'goNext'
}

const NewContainer = () => {
  const [index, setIndex] = React.useState(0)
  const user = useUser()
  const { dispatch, actions } = useOverlay()
  const { closeNotification } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: () => {
      closeNotification()
      dispatch({ type: actions.modal.close })
    }
  })
  const isLast = index + 1 === size(componentMap)

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.newScroll.props.scrollToFocusedInput(node)
  }

  const goNext = () => {
    if (isLast) {
      updateUser({ id: user.id, updates: { new: false } })
    } else {
      setIndex(index + 1)
    }
  }

  const finishNew = () => {
    updateUser({ id: user.id, updates: { new: false } })
  }

  return (
    <View style={styles.container}>
      <Header index={index} />

      <ComponentMap
        userId={user.id}
        goNext={goNext}
        index={index}
        onFocus={scrollToInput}
        finishNew={finishNew}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ADJUSTED_HEIGHT,
    width: SCREEN_WIDTH
  }
})

NewContainer.propTypes = {
  id: PropTypes.string,
  isDialogOpen: PropTypes.bool
}

export default NewContainer
