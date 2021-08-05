import React from 'react'

import { GetRSVP } from '@graphql/invite/queries.js'

import EventList from '@components/shared/itemList'

const ProfileResponseList = () => {
  const noResponses = 'No RSVPs to show.'

  const filterList = list => {
    let rsvps = []
    list.invites.forEach(invite => {
      if (invite.answer === 'ACCEPTED') {
        rsvps.push(invite.sender)
      }
    })
    return rsvps
  }

  return (
    <EventList
      query={GetRSVP}
      filterList={filterList}
      noDataMessage={noResponses}
      onItemPress={() => {}}
      hideAvatar
    />
  )
}

export default ProfileResponseList
