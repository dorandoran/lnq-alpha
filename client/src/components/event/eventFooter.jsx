import React, { useState } from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import useUpdateUser from '@graphql/user/useUpdateUser'
import { useDebounce } from '@hooks/useDebounce'

import { View, StyleSheet, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import { HeaderButton } from '@common'
import { theme, SCREEN_HEIGHT } from '@util'

const EventFooter = ({ modalActions, event }) => {
  const { user, updateUserState } = useUser()
  const isBookmarked = checkBookmarked(event)
  const [bookmarkConfirm, setBookmarkConfirm] = useState(false)
  const [currentBookmark, setCurrentBookmark] = useState(isBookmarked)
  const [updateUser, loading] = useUpdateUser({
    onCompleted: res => {
      setBookmarkConfirm(true)
      setCurrentBookmark(!currentBookmark)
      updateUserState({ ...res.updateUser })
    }
  })

  useDebounce(
    () => {
      if (bookmarkConfirm) {
        setBookmarkConfirm(false)
      }
    },
    2000,
    bookmarkConfirm
  )

  function checkBookmarked(currentBookmark) {
    return !!user.bookmarkEvents.find(event => event.id === currentBookmark.id)
  }

  const handleBookmarkEvent = () => {
    const updateKey = isBookmarked
      ? 'removeBookmarkEvents'
      : 'addBookmarkEvents'

    updateUser({
      updates: { [updateKey]: [event.id] }
    })
  }

  const BookmarkButton = () => {
    if (loading || bookmarkConfirm) {
      return (
        <HeaderButton
          type='material'
          name='done'
          color='success'
          backgroundColor={theme.color.shadow}
          onPress={() => {}}
          loading={loading}
        />
      )
    }
    return (
      <HeaderButton
        type='material-community'
        name={currentBookmark ? 'bookmark' : 'bookmark-outline'}
        color={currentBookmark ? theme.color.secondary : theme.color.tertiary}
        backgroundColor={theme.color.shadow}
        onPress={handleBookmarkEvent}
        size={30}
      />
    )
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
        <BookmarkButton />
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
