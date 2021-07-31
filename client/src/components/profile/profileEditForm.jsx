import React, { Fragment } from 'react'
import useProfile from '@context/profileContext'

import { theme } from '@util'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, StyleSheet } from 'react-native'
import { StyledInput } from '@common'

const inputMap = [
  {
    label: 'First Name',
    value: 'firstName'
  },
  {
    label: 'Last Name',
    value: 'lastName'
  },
  {
    label: 'Website',
    value: 'website'
  },
  {
    label: 'About',
    value: 'about'
  }
]

const ProfileEditForm = () => {
  const { profileState, dispatch, actions } = useProfile()
  const { form } = profileState

  const updateForm = (key, value) => {
    dispatch({ type: actions.updateEditForm, payload: { [key]: value } })
  }

  return (
    <Fragment>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.awareContainer}
      >
        <View style={styles.view}>
          <View style={[styles.formContainer, styles.marginBottom]}>
            {inputMap.map(({ label, value, ...rest }) => {
              // About component
              if (value === 'about') {
                return (
                  <StyledInput
                    key={value}
                    label={label}
                    autoCapitalize={value === 'website' ? 'none' : 'words'}
                    onChange={({ nativeEvent }) =>
                      updateForm(value, nativeEvent.text)
                    }
                    value={form[value]}
                    {...rest}
                  />
                )
              }

              // Input components
              return (
                <StyledInput
                  key={value}
                  label={label}
                  autoCapitalize={value === 'website' ? 'none' : 'words'}
                  onChange={({ nativeEvent }) =>
                    updateForm(value, nativeEvent.text)
                  }
                  value={form[value]}
                  {...rest}
                />
              )
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center'
  },
  marginBottom: {
    marginBottom: '5%'
  },
  formContainer: {
    width: '100%',
    alignItems: 'center'
  },
  awareContainer: {
    backgroundColor: theme.color.background,
    paddingBottom: '2%'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
    width: '100%'
  },
  label: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: '1%'
  }
})

export default ProfileEditForm
