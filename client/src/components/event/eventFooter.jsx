import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import useUpdateUser from '@graphql/user/useUpdateUser'
import useNotification from '@hooks/useNotification'
import { useDebounce } from '@hooks/useDebounce'

import { View, StyleSheet, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import { HeaderButton } from '@common'
import { theme, SCREEN_HEIGHT } from '@util'

const EventFooter = ({ modalActions, event }) => {
  const { user, updateUserState } = useUser()
  const [currentBookmark, setCurrentBookmark] = React.useState(
    isBookmarked(event)
  )
  const { throwSuccess } = useNotification()
  const [updateUser] = useUpdateUser({
    onCompleted: res => {
      const message = currentBookmark
        ? 'Event bookmarked'
        : 'Event removed from bookmarks'
      throwSuccess(message)
      updateUserState({ ...res.updateUser })
    }
  })

  useDebounce(
    () => {
      if (isBookmarked(event) !== currentBookmark) {
        const updateKey = isBookmarked(event)
          ? 'removeBookmarkEvents'
          : 'addBookmarkEvents'

        updateUser({
          updates: { [updateKey]: [event.id] }
        })
      }
    },
    1000,
    currentBookmark
  )

  function isBookmarked(currentBookmark) {
    return !!user.bookmarkEvents.find(event => event.id === currentBookmark.id)
  }

  return (
    <React.Fragment>
      <View style={styles.socialContainer}>
        <HeaderButton
          type='entypo'
          name='ticket'
          color='tertiary'
          backgroundColor='secondary'
          onPress={() => {}}
        />
        <HeaderButton
          type='material-community'
          name={currentBookmark ? 'bookmark' : 'bookmark-outline'}
          color={currentBookmark ? theme.color.secondary : theme.color.tertiary}
          backgroundColor={theme.color.shadow}
          onPress={() => setCurrentBookmark(!currentBookmark)}
          size={30}
        />
        <HeaderButton
          type='material-community'
          name='share-outline'
          color='tertiary'
          backgroundColor={theme.color.shadow}
          onPress={() => {}}
          size={32}
        />
      </View>
      <Pressable
        style={styles.fabContainer}
        onPress={modalActions.openAddMedia}
      >
        <Icon
          type='feather'
          name='plus'
          color={theme.color.secondary}
          reverse
        />
      </Pressable>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  socialContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 25,
    left: 25,
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  fabContainer: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT + 10,
    right: 30
  }
})

EventFooter.propTypes = {
  event: PropTypes.object,
  modalActions: PropTypes.object
}

export default EventFooter
