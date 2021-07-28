export const TABS = {
  EVENTS: 'events',
  RSVP: 'rsvp',
  SAVES: 'saves'
}

export const NOTIFICATION_TABS = {
  ALL: 'All',
  INVITES: 'Invites'
}

export const tabButtonList = [
  {
    label: 'Events',
    value: TABS.EVENTS
  },
  {
    label: 'RSVP',
    value: TABS.RSVP
  },
  {
    label: 'Saves',
    value: TABS.SAVES
  }
]

export const notificationTabList = Object.keys(NOTIFICATION_TABS).map(item => {
  return NOTIFICATION_TABS[item]
})

export const SCREEN = {
  MAIN: 'Profile Main',
  NOTIFICATIONS: 'Profile Notifications',
  INBOX: 'Profile Inbox',
  MESSAGE: 'Profile Message',
  EDIT: 'Edit Profile'
}

export const getUserFormFields = user => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    website: user?.website || '',
    about: user?.about || ''
  }
}