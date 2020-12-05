import React from 'react'

import { useQuery } from '@apollo/client'
import { GetUserInbox } from '@graphql/message/queries'

import { View, StyleSheet, Text } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import { Loading } from '@common'
import { theme } from '@util'

const ProfileInbox = () => {
  const [text, setText] = React.useState('')
  const { data, loading } = useQuery(GetUserInbox)

  if (loading) return <Loading />

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder='Search'
        value={text}
        onChangeText={text => setText(text)}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainer}
      />
      {!data?.user.inbox.length ? (
        <View style={styles.noConversations}>
          <Icon
            type='material-community'
            name='emoticon-cry-outline'
            color={theme.color.tertiary}
          />
          <Text style={[styles.text, styles.noConversationText]}>
            {'No Conversations to Show...'}
          </Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },
  listItem: {
    backgroundColor: theme.color.background
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  noConversations: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  noConversationText: {
    marginLeft: '3%'
  }
})

export default ProfileInbox
