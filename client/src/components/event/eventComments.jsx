import React from 'react'
import PropTypes from 'prop-types'

import { useQuery } from '@apollo/client'
import { GetEventComments } from '@graphql/message/queries'

import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { Loading } from '@common'
import { theme } from '@util'

const EventComments = ({ event }) => {
  const { data, loading } = useQuery(GetEventComments, {
    variables: { id: event.id }
  })

  if (loading) return <Loading />

  if (!data?.event.comments.length) {
    return (
      <View style={styles.container}>
        <ListItem containerStyle={styles.listItem}>
          <Icon
            type='material-community'
            name='emoticon-cry-outline'
            color={theme.color.tertiary}
          />
          <ListItem.Title style={styles.text}>
            {'No Comments...'}
          </ListItem.Title>
        </ListItem>
      </View>
    )
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        {data.event.comments.map(comment => {
          const { owner, text, created_at } = comment
          console.log(created_at)

          return (
            <TouchableWithoutFeedback key={comment.id}>
              <ListItem containerStyle={styles.listItem}>
                <Image
                  source={{ uri: owner.avatar.uri }}
                  style={styles.userImage}
                  borderRadius={50}
                  PlaceholderContent={<Loading size='small' />}
                  placeholderStyle={styles.placeholder}
                />
                <View style={{ flex: 1 }}>
                  <ListItem.Subtitle
                    style={styles.username}
                  >{`@${owner.username}  |  `}</ListItem.Subtitle>
                  <Text style={styles.comment}>{text}</Text>
                </View>
              </ListItem>
            </TouchableWithoutFeedback>
          )
        })}
      </ScrollView>
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

EventComments.propTypes = {
  event: PropTypes.object
}

export default EventComments
