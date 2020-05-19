import React from 'react'
import PropTypes from 'prop-types'
import size from 'lodash/size'

import useUser from '@context/userContext'
import useOverlay from '@context/overlayContext'

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import ComponentMap, {
  componentMap
} from '@components/new/utilComponents/newComponentMap'
import Header from '@components/new/utilComponents/newComponentHeader'
import { Loading } from '@common'
import { theme, ADJUSTED_HEIGHT, SCREEN_WIDTH } from '@util'

const NewContainer = () => {
  const [index, setIndex] = React.useState(0)
  const [nextPressed, setNextPressed] = React.useState(false)
  const user = useUser()
  const { dispatch, actions } = useOverlay()
  const isLastPage = index + 1 === size(componentMap)

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.newScroll.props.scrollToFocusedInput(node)
  }

  const handleNextPress = () => {
    if (isLastPage) {
      dispatch({ type: actions.modal.close })
    } else {
      setNextPressed(true)
    }
  }

  const goNext = () => {
    setNextPressed(false)
    setIndex(index + 1)
  }

  return (
    <View style={styles.container}>
      <Header index={index} />

      <ComponentMap
        userId={user.id}
        nextPressed={nextPressed}
        goNext={goNext}
        index={index}
        onFocus={scrollToInput}
      />

      <View style={styles.footerContainer}>
        {!isLastPage ? (
          <TouchableOpacity disabled={nextPressed} onPress={goNext}>
            <Text style={[styles.text, styles.skip]}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}

        {nextPressed ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={handleNextPress}>
            <Text style={styles.text}>{isLastPage ? 'Finish' : 'Next'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ADJUSTED_HEIGHT,
    width: SCREEN_WIDTH
  },
  footerContainer: {
    height: '10%',
    paddingHorizontal: '10%',
    paddingTop: '4%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  skip: {
    color: theme.color.accent
  }
})

NewContainer.propTypes = {
  id: PropTypes.string,
  isDialogOpen: PropTypes.bool
}

export default NewContainer
