import React from 'react'
import useCreate from '@context/createContext'

import UserSearchList from '@components/shared/userSearchList'

const CreateInvite = () => {
  const [text, setText] = React.useState('')
  const { details, updateDetails } = useCreate()

  const handleItemPress = item => {
    updateDetails('recipientIds', item.id)
  }

  const handleFollowPress = item => {
    updateDetails('followIds', item.id)
  }

  return (
    <UserSearchList
      value={text}
      onChangeText={text => setText(text)}
      selected={details.recipientIds}
      followSelected={details.followIds}
      onItemPress={handleItemPress}
      onFollowPress={handleFollowPress}
    />
  )
}

export default CreateInvite
