import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import useAuth from '@context/authContext'
import { withNavigation } from '@react-navigation/compat'

import { theme } from '@src/theme'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { Spacer } from '@common'

const AuthSubmit = ({
  submitButtonTitle,
  navigationRoute,
  routeContent,
  navigation,
  onSubmit,
  onGoogleSubmit,
  onFacebookSubmit
}) => {
  const { authState } = useAuth()

  return (
    <Fragment>
      <Spacer>
        {authState.loading ? (
          <Button
            loading={true}
            buttonStyle={styles.submitButtonStyle}
            title={submitButtonTitle}
            onPress={onSubmit}
          />
        ) : (
          <Button
            buttonStyle={styles.submitButtonStyle}
            title={submitButtonTitle}
            onPress={onSubmit}
          />
        )}
      </Spacer>
      <Spacer>
        <TouchableOpacity onPress={() => navigation.navigate(navigationRoute)}>
          <Text style={styles.signinStyle}>{routeContent}</Text>
        </TouchableOpacity>
      </Spacer>
      <Spacer>
        <View style={styles.lineStyle}>
          <Text style={styles.lineStyle}>
            ──────── Or Connect With ────────
          </Text>
        </View>
      </Spacer>
      <Spacer>
        <View style={styles.oauthStyle}>
          <Button
            buttonStyle={styles.authButtonsFb}
            title='FACEBOOK'
            onPress={onFacebookSubmit}
          />
          <Button
            buttonStyle={styles.authButtonsGg}
            title='GOOGLE'
            onPress={onGoogleSubmit}
          />
        </View>
      </Spacer>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  lineStyle: {
    alignItems: 'center',
    color: theme.color.tertiary
  },
  oauthStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  signinStyle: {
    alignSelf: 'center',
    fontSize: 20,
    color: theme.color.tertiary
  },
  submitButtonStyle: {
    backgroundColor: theme.color.secondary,
    borderRadius: 20
  },
  authButtonsFb: {
    width: 150,
    backgroundColor: theme.color.primary,
    borderRadius: 20
  },
  authButtonsGg: {
    width: 150,
    backgroundColor: theme.color.secondary,
    borderRadius: 20
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
