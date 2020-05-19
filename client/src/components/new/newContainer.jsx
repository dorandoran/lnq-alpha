import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import ComponentMap from '@components/new/utilComponents/newComponentMap'
import Header from '@components/new/utilComponents/newComponentHeader'
import { theme, ADJUSTED_HEIGHT, SCREEN_WIDTH } from '@util'

const NewContainer = () => {
  const [index, setIndex] = React.useState(0)
  const [nextPressed, setNextPressed] = React.useState(false)
  const user = useUser()

  // Programmatically scroll to inputs
  const scrollToInput = node => {
    this.newScroll.props.scrollToFocusedInput(node)
  }

  const handleNextPress = () => {
    setNextPressed(true)
  }

  const goNext = () => {
    setNextPressed(false)
    setIndex(index + 1)
  }

  return (
    <View style={styles.container}>
      <Header index={index} />

      <KeyboardAwareScrollView
        enableOnAndroid
        innerRef={ref => (this.newScroll = ref)}
        contentContainerStyle={{ flex: 1 }}
      >
        <ComponentMap
          userId={user.id}
          nextPressed={nextPressed}
          goNext={goNext}
          index={index}
          onFocus={scrollToInput}
        />
      </KeyboardAwareScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity disabled={nextPressed} onPress={goNext}>
          <Text style={[styles.text, styles.skip]}>Skip</Text>
        </TouchableOpacity>
        {nextPressed ? (
          <ActivityIndicator size='small' color={theme.color.tertiary} />
        ) : (
          <TouchableOpacity onPress={handleNextPress}>
            <Text style={styles.text}>Next</Text>
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
  headerContainer: {
    height: '20%',
    paddingHorizontal: '5%',
    justifyContent: 'flex-end'
  },
  footerContainer: {
    height: '5%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold'
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
