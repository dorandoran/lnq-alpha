import React from 'react'
import { findIndex } from 'lodash'
import useProfile, { actions } from '@context/profileContext'
import useUser from '@context/userContext'

import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, StyleSheet } from 'react-native'
import UserSearchList from '@components/shared/userSearchList'
import Modal from 'react-native-modal'
import { Header, HeaderButton } from '@common'
import { theme, goBack } from '@util'

const InboxScreen = () => {
  const { dispatch } = useProfile()
  const { user } = useUser()
  const [text, setText] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const [followSelected, setFollowSelected] = React.useState([])
  const [userModal, setUserModal] = React.useState(false)

  const handleItemPress = ({ item, state }) => {
    const index = findIndex(state, { id: item.id })
    let users = []

    if (index > -1) {
      users = state.filter((_, idx) => index !== idx)
    } else {
      const user = { id: item.id, username: item.username }
      users = [...state, user]
    }

    if (state === selected) {
      setSelected(users)
    } else {
      setFollowSelected(users)
    }
  }

  const handleBackPress = () => {
    goBack()
  }

  const handleNextPress = () => {
    dispatch({ type: actions.addMessageRecipients, payload: selected })
    setUserModal(false)
  }

  return (
    <React.Fragment>
      <View style={styles.container}>
        <GiftedChat
          messages={[]}
          onSend={() => {}}
          user={{ _id: user.id, name: user.username, avatar: user.avatar }}
        />
      </View>

      <Modal isVisible={userModal}>
        <View style={styles.modalContainer}>
          <Header position='relative' backgroundColor='background'>
            <HeaderButton
              type='material'
              name='chevron-left'
              color='tertiary'
              backgroundColor='shadow'
              onPress={handleBackPress}
              size={30}
            />
            <Text style={styles.header}>Select Users</Text>
            <HeaderButton
              type='ionicon'
              name='ios-text'
              color='tertiary'
              backgroundColor='shadow'
              onPress={handleNextPress}
            />
          </Header>
          <UserSearchList
            value={text}
            onChangeText={text => setText(text)}
            selected={selected.map(i => i.id)}
            followSelected={followSelected.map(i => i.id)}
            onFollowPress={item =>
              handleItemPress({ item, state: followSelected })
            }
            onItemPress={item => handleItemPress({ item, state: selected })}
          />
        </View>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  modalContainer: {
    height: '90%',
    width: '100%'
  },
  header: {
    color: theme.color.tertiary,
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default InboxScreen
