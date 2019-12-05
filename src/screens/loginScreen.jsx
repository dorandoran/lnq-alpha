import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AuthSubmit from '../components/AuthSubmit'
import Spacer from '../components/Spacer'

const LoginScreen = () => {
  return (
    <View style={styles.containerStyle}>
      <Spacer>
        <Text style={{ fontWeight: 'bold', fontSize: 50, alignSelf: 'center' }}>LNQ</Text>
      </Spacer>
      <Spacer>
        <TextInput
          style={styles.inputStyle}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Email"
        />
      </Spacer>
      <Spacer>
        <TextInput
          style={styles.inputStyle}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
        />
      </Spacer>
      <AuthSubmit
        submitButtonTitle="Login"
        navigationRoute="Signup"
        routeContent="New user? Sign up here"
        onSubmit={() => {}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30
  },
  inputStyle: {
    backgroundColor: '#eee',
    fontSize: 20,
    padding: 10,
    borderRadius: 8
  }
})

LoginScreen.propTypes = {
  navigation: PropTypes.object
}

export default LoginScreen