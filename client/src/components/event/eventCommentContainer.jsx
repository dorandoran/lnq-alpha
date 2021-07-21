import React from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'
import useAddComment from '@graphql/message/useAddComment'

import EventComments from '@components/event/eventComments'
import { View, StyleSheet, Image } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { Loading } from '@common'
import { theme } from '@util'

const EventCommentContainer = ({ event }) => {
  const [text, setText] = React.useState('')
  const { user } = useUser()
  const [addComment, loading] = useAddComment({
    onCompleted: () => {
      setText('')
    }
  })

  if (loading) return <Loading />

  const handleAddComment = () => {
    addComment({ eventId: event.id, comment: text })
  }

  return (
    <View style={styles.container}>
      <ListItem containerStyle={[styles.listItem, styles.commentContainer]}>
        <Image
          source={{ uri: user.avatar.uri }}
          style={styles.userImage}
          borderRadius={50}
          PlaceholderContent={<Loading size='small' />}
          placeholderStyle={styles.placeholder}
        />
        <ListItem.Input
          value={text}
          placeholder='Add new comment...'
          onChangeText={t => setText(t)}
          style={[styles.comment, styles.commentInputContainer]}
          containerStyle={styles.commentInput}
          multiline
          rightIcon={
            <Icon
              type='material-community'
              name='send'
              color={theme.color.secondary}
              onPress={handleAddComment}
            />
          }
        />
      </ListItem>
      <EventComments event={event} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  commentContainer: {
    marginHorizontal: 1
  },
  commentInputContainer: {
    marginRight: '5%',
    textAlign: 'left'
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: theme.color.tertiary
  },
  commentInput: {
    padding: '3%'
  },
  listItem: {
    backgroundColor: theme.color.background
  },
  text: {
    color: theme.color.tertiary,
    fontSize: 18
  },
  username: {
    color: theme.color.disabled
  },
  comment: {
    color: theme.color.tertiary,
    fontSize: 16
  }
})

EventCommentContainer.propTypes = {
  event: PropTypes.object
}

export default EventCommentContainer
