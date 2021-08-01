import React from 'react'
import PropTypes from 'prop-types'

import { View, StyleSheet, SectionList, Text } from 'react-native'
import { Divider, ListItem } from 'react-native-elements'
import { theme } from '@util'

const ProfileMenuModal = ({ modalActions }) => {
  const menuButtonList = [
    {
      title: '',
      data: [
        {
          key: 'updateInformation',
          value: 'Update Profile Information',
          onPress: modalActions.navigateEditForm
        }
      ]
    },
    {
      title: '',
      data: [
        {
          key: 'logout',
          value: 'Logout',
          onPress: modalActions.logout
        },
        {
          key: 'cancel',
          value: 'Cancel',
          onPress: modalActions.cancelModal
        }
      ]
    }
  ]

  const renderButton = ({ index, section, item }) => {
    const titleExtraStyles = {}
    const itemExtraStyles = {}

    // Top border styles
    if (!index) {
      itemExtraStyles.borderTopLeftRadius = 15
      itemExtraStyles.borderTopRightRadius = 15
    }

    // Bottom border styles
    if (index === section.data.length - 1) {
      itemExtraStyles.borderBottomLeftRadius = 15
      itemExtraStyles.borderBottomRightRadius = 15
    }

    // Disabled styles
    if (item.disabled) {
      titleExtraStyles.color = theme.color.disabled
    }

    // Cancel styles
    if (item.key === 'cancel') {
      titleExtraStyles.color = theme.color.error
    }

    if (!item.canEdit || item.canEdit) {
      return (
        <ListItem
          containerStyle={[styles.containerStyle, itemExtraStyles]}
          onPress={item.onPress}
        >
          <ListItem.Title style={[styles.text, titleExtraStyles]}>
            {item.value}
          </ListItem.Title>
        </ListItem>
      )
    }
  }

  const renderSeparator = () => {
    return <Divider />
  }

  return (
    <View>
      <SectionList
        style={styles.container}
        sections={menuButtonList}
        keyExtractor={button => button.key}
        renderItem={item => renderButton(item)}
        ItemSeparatorComponent={renderSeparator}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.text, styles.title]}>{title}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  containerStyle: {
    backgroundColor: theme.color.accent,
    justifyContent: 'center'
  },
  text: {
    color: theme.color.tertiary,
    fontWeight: 'bold'
  },
  title: {
    padding: 1
  }
})

ProfileMenuModal.propTypes = {
  modalActions: PropTypes.object
}

export default ProfileMenuModal
