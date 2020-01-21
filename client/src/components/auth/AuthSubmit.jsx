import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Spacer from '@common/Spacer'
import { withNavigation } from 'react-navigation'
import { useAuth } from '@context/auth-context'

const AuthSubmit = ({
  submitButtonTitle,
  navigationRoute,
  routeContent,
  navigation,
  onSubmit,
  onGoogleSubmit,
  onFacebookSubmit
}) => {
  const { isLoading } = useAuth()

  return (
    <Fragment>
      <Spacer>
        {isLoading
          ? <Button
            loading={true}
            buttonStyle={styles.submitButtonStyle}
            title={submitButtonTitle}
            onPress={onSubmit}
          />
          : <Button
            buttonStyle={styles.submitButtonStyle}
            title={submitButtonTitle}
            onPress={onSubmit}
          />}
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
          <Button buttonStyle={styles.authButtonsFb} title="FACEBOOK" onPress={onFacebookSubmit} />
          <Button buttonStyle={styles.authButtonsGg} title="GOOGLE" onPress={onGoogleSubmit} />
        </View>
      </Spacer>
    </Fragment>
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
  submitButtonStyle: {
    backgroundColor: '#0C1D27'
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
  onSubmit: PropTypes.func,
  onGoogleSubmit: PropTypes.func,
  onFacebookSubmit: PropTypes.func
}

export default withNavigation(AuthSubmit)