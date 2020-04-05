import React, { useContext } from 'react'
import { Route } from '@context/routeStore'
import CreateContext from '@context/createContext'
import { useNavigation } from '@react-navigation/native'

import { View, Keyboard, Text, StyleSheet } from 'react-native'
import Header from '@common/header'
import { Icon } from 'react-native-elements'
import { theme } from '@src/theme'

import ActionSaveEvent from '@components/create/utilComponents/actionSaveEvent'

const CreateHeader = () => {
  const { details, resetDetails } = useContext(CreateContext)
  const { name } = useContext(Route.State)
  const navigation = useNavigation()
  const isInvite = name.includes('Invite')

  const closeScreen = () => {
    Keyboard.dismiss()
    resetDetails()
    navigation.navigate('Home')
  }

  const navigateToInvite = () => {
    Keyboard.dismiss()
    navigation.navigate('Create Invite')
  }

  const goBack = () => {
    Keyboard.dismiss()
    navigation.navigate('Create Details')
  }

  // Checks if keys that have strings are filled
  // If not, disable button
  const checkDisabled = () => {
    let disabled = false
    Object.keys(details).forEach(key => {
      if (typeof details[key] === 'string' && !details[key].length) {
        disabled = true
      }
    })
    return disabled
  }

  return (
    <Header position="relative" backgroundColor={theme.color.background}>
      <Icon
        type="ionicon"
        name="ios-arrow-back"
        color={theme.color.tertiary}
        onPress={isInvite ? goBack : closeScreen}
      />
      {isInvite ? <Text style={styles.header}>Invite</Text> : <View />}
      {isInvite ? (
        <ActionSaveEvent onComplete={closeScreen} />
      ) : checkDisabled() ? (
        <Icon
          type="font-awesome"
          name="exclamation"
          color={theme.color.secondary}
        />
      ) : (
        <Icon
          type="material"
          name="person-add"
          color={theme.color.tertiary}
          onPress={navigateToInvite}
        />
      )}
    </Header>
  )
}

const styles = StyleSheet.create({
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default CreateHeader
