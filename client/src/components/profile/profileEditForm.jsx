import React from 'react'
import PropTypes from 'prop-types'
import useProfile from '@context/profileContext'

import { SCREEN_HEIGHT, SCREEN_WIDTH, theme } from '@util'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'react-native-elements'
import { StyledInput, Loading } from '@common'

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

const ProfileEditForm = ({ modalActions }) => {
  const { profileState, dispatch, actions } = useProfile()
  const { form } = profileState

  const updateForm = (key, value) => {
    dispatch({ type: actions.updateEditForm, payload: { [key]: value } })
  }

  const AvatarChangeButton = () => {
    return (
      <TouchableOpacity
        style={styles.avatarButton}
        onPress={modalActions.openUpdateAvatar}
      >
        <Icon
          type='material-community'
          name='camera'
          color={theme.color.tertiary}
        />
      </TouchableOpacity>
    )
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={styles.awareContainer}
    >
      <View style={styles.view}>
        <ImageBackground
          source={require('../../../assets/profile-main.png')}
          style={styles.imageBackground}
        >
          <View />
        </ImageBackground>
        <View style={styles.imageContainer}>
          {form.avatar ? (
            <ImageBackground
              imageStyle={styles.imageStyle}
              style={styles.image}
              source={{ uri: form.avatar.uri }}
              PlaceholderContent={
                <Loading size='small' styleProps={styles.loading} />
              }
            >
              <AvatarChangeButton />
            </ImageBackground>
          ) : (
            <View style={[styles.image, styles.imageStyle]}>
              <AvatarChangeButton />
            </View>
          )}
        </View>
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
  )
}

const styles = StyleSheet.create({
  avatarButton: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  view: {
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30
  },
  imageBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4
  },
  imageStyle: {
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: theme.color.background,
    borderColor: theme.color.background
  },
  image: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  loading: {
    borderRadius: 50
  }
})

ProfileEditForm.propTypes = {
  modalActions: PropTypes.object.isRequired
}

export default ProfileEditForm
