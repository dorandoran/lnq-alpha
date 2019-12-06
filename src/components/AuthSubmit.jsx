import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Spacer from './Spacer'
import { withNavigation } from 'react-navigation'
import { Context as AuthContext } from '../context/AuthContext'

const AuthSubmit = ({ submitButtonTitle, navigationRoute, routeContent, navigation, onSubmit }) => {
  return (
    <>
      <Spacer>
		  <Button
			  buttonStyle={{ backgroundColor: '#0C1D27' }}
			  title={submitButtonTitle}
			  onPress={onSubmit}
		  />
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate(navigationRoute)}>
          <Text style={styles.signinStyle}>{routeContent}</Text>
        </TouchableOpacity>
      </Spacer>
      <Spacer>
        <View style={styles.lineStyle}>
          <Text>──────── Or Connect With ────────</Text>
        </View>
      </Spacer>
      <Spacer>
        <View style={styles.oauthStyle}>
          <Button buttonStyle={styles.authButtonsFb} title="FACEBOOK" />
          <Button buttonStyle={styles.authButtonsGg} title="GOOGLE" />
        </View>
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  lineStyle: {
    alignItems: 'center'
  },
  oauthStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  signinStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#BE0000'
  },
  authButtonsFb: {
    width: 150,
    backgroundColor: '#0C1D27'
  },
  authButtonsGg: {
    width: 150,
    backgroundColor: '#BE0000'
  }
})

AuthSubmit.propTypes = {
  submitButtonTitle: PropTypes.string,
  navigationRoute: PropTypes.string,
  routeContent: PropTypes.string,
  navigation: PropTypes.object,
  onSubmit: PropTypes.func
}

export default withNavigation(AuthSubmit)