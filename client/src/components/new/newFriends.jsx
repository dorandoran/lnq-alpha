import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import useRequestFollow from '@graphql/follow/useRequestFollow'
import useNotification from '@hooks/useNotification'

import UserSearchList from '@components/shared/userSearchList'
import BottomBar from '@components/new/utilComponents/newBottomButtonBar'

const NewFriends = ({ goNext }) => {
  const [text, setText] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const { throwLoading } = useNotification()
  const requestFollow = useRequestFollow({
    onCompleted: () => {
      goNext()
    }
  })

  const handleFinish = () => {
    throwLoading()
    requestFollow({ recipientIds: selected })
  }

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

  return (
    <Fragment>
      <UserSearchList
        value={text}
        onChangeText={text => setText(text)}
        selected={selected}
        onItemPress={handleItemPress}
      />
      <BottomBar onActionPress={handleFinish} showFinish />
    </Fragment>
  )
}

NewFriends.propTypes = {
  userId: PropTypes.string,
  goNext: PropTypes.func
}

export default NewFriends
