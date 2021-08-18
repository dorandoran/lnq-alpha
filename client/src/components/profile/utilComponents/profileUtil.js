export const TABS = {
  EVENTS: 'Events',
  RSVP: 'RSVP',
  BOOKMARK: 'Bookmarks'
}

export const NOTIFICATION_TABS = {
  ALL: 'All',
  INVITES: 'Invites'
}

export const notificationTabList = Object.keys(NOTIFICATION_TABS).map(item => {
  return NOTIFICATION_TABS[item]
})

export const SCREEN = {
  MAIN: 'Profile Main',
  EDIT: 'Edit Profile',
  FOLLOWING: 'Following',
  FOLLOWERS: 'Followers',
  EVENTS: 'Past Events',
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