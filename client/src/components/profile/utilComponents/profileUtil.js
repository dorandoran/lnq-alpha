export const TABS = {
  EVENTS: 'events',
  RSVP: 'rsvp',
  BOOKMARK: 'bookmarks'
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
    label: 'Bookmarks',
    value: TABS.BOOKMARK
  }
]

export const notificationTabList = Object.keys(NOTIFICATION_TABS).map(item => {
  return NOTIFICATION_TABS[item]
})

export const SCREEN = {
  MAIN: 'Profile Main',
  EDIT: 'Edit Profile',
  FOLLOWING: 'Following',
  FOLLOWERS: 'Followers',
  NOTIFICATIONS: 'Profile Notifications',
  INBOX: 'Profile Inbox',
  MESSAGE: 'Profile Message',
}

export const getUserFormFields = user => {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    website: user?.website || '',
    about: user?.about || '',
    avatar: user?.avatar
  }
}