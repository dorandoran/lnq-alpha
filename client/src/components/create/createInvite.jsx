import React from 'react'
import { StyleSheet } from 'react-native'
import { theme } from '@util'

import UserSearchList from '@components/shared/userSearchList'

const CreateInvite = () => {
  const [text, setText] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const [followSelected, setFollowSelected] = React.useState([])

  const handleItemPress = item => {
    const index = selected.indexOf(item.id)
    let categories = []

    if (index > -1) {
      categories = selected.filter((_, idx) => index !== idx)
    } else {
      categories = [...selected, item.id]
    }
    setSelected(categories)
  }

  const handleFollowPress = item => {
    const index = followSelected.indexOf(item.id)
    let categories = []

    if (index > -1) {
      categories = followSelected.filter((_, idx) => index !== idx)
    } else {
      categories = [...followSelected, item.id]
    }
    setFollowSelected(categories)
  }

  return (
    <UserSearchList
      value={text}
      onChangeText={text => setText(text)}
      selected={selected}
      followSelected={followSelected}
      onItemPress={handleItemPress}
      onFollowPress={handleFollowPress}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background
  },
  containerStyle: {
    backgroundColor: theme.color.background,
    marginBottom: '5%'
  },
  inputContainer: {
    backgroundColor: theme.color.accent,
    borderRadius: 25,
    paddingLeft: '3%',
    borderBottomWidth: 0
  }
})

export default CreateInvite
