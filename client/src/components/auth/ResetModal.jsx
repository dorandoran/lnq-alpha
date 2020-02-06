import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { Button } from 'react-native-elements'
import Spacer from '@common/Spacer'
import { useAuth } from '@context/authContext'
import { theme } from '@src/theme'

const ResetModal = ({ isModalShown, cancelModal, emailHolder }) => {
  const [email, setEmail] = useState(emailHolder)

  const { passReset, success, isLoading, err } = useAuth()

  useEffect(() => {
    if (err) {
      alert(err)
    }
  }, [err])

  let submitButton
  let modal = null

  if (isLoading) {
    submitButton = (
      <Button
        buttonStyle={styles.buttonSubmitStyle}
        loading={true}
        title="Reset Password"
        onPress={async () => {
          await passReset({ email })
        }}
      />
    )
  } else {
    submitButton = (
      <Button
        buttonStyle={styles.buttonSubmitStyle}
        title="Reset Password"
        onPress={async () => {
          await passReset({ email })
          setTimeout(() => {
            cancelModal()
          }, 1500)
        }}
      />
    )
  }

  if (isModalShown && success) {
    modal = (
      <Fragment>
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={cancelModal}
        >
        </TouchableOpacity>
        <View style={styles.modalContainerStyle}>
          <Spacer>
            <Text style={styles.headingStyle}>Email Sent</Text>
          </Spacer>
        </View>
      </Fragment>
    )
  } else if (isModalShown) {
    modal = (
      <Fragment>
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={cancelModal}
        >
        </TouchableOpacity>
        <View style={styles.modalContainerStyle}>
          <Spacer>
            <Spacer>
              <Text style={styles.headingStyle}>Password Recovery</Text>
            </Spacer>
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter Your Email for Recovery"
              value={email}
              onChangeText={setEmail}
            />
          </Spacer>
          <Spacer>
            <View style={styles.buttonViewStyle}>
              {submitButton}
              <Button
                buttonStyle={styles.buttonCancelStyle}
                title="Cancel"
                onPress={cancelModal}
              />
            </View>
          </Spacer>
        </View>
      </Fragment>
    )
  } else {
    modal = null
  }

  return modal
}

const styles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: 'white',
    position: 'absolute',
    height: 300,
    width: 400,
    zIndex: 99,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  modalBackdrop: {
    position: 'absolute',
    zIndex: 98,
    backgroundColor: 'grey',
    opacity: 0.75,
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  inputStyle: {
    backgroundColor: '#eee',
    fontSize: 20,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10
  },
  headingStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  buttonViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  buttonCancelStyle: {
    width: 150,
    backgroundColor: '#BE0000'
  },
  buttonSubmitStyle: {
    width: 150,
    backgroundColor: theme.color.primary
  }
})

ResetModal.propTypes = {
  isModalShown: PropTypes.bool,
  cancelModal: PropTypes.func,
  emailHolder: PropTypes.string
}

export default ResetModal
