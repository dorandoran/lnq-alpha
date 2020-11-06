import Constants from 'expo-constants'
import { formatDateTime, SCREEN_HEIGHT, EVENT_TYPES } from '@util'

export const adjustedScreenHeight = SCREEN_HEIGHT - Constants.statusBarHeight

export const eventDetails = [
  {
    key: 'name',
    title: ({ name }) => name,
    iconName: 'tag-outline'
  },
  {
    key: 'type',
    additionalKeys: ['isPrivate', 'plusOne'],
    title: ({ type }) => EVENT_TYPES[type],
    iconName: 'format-list-bulleted'
  },
  {
    key: 'isPrivate',
    additionalKeys: ['type', 'plusOne'],
    title: ({ isPrivate }) => (isPrivate ? 'Private' : 'Public'),
    iconName: 'account-group',
    rightTitle: ({ plusOne }) => (plusOne ? 'Plus One' : 'No Plus One'),
    rightIconType: 'material',
    rightIconName: ({ plusOne }) => (plusOne ? 'plus-one' : 'exposure-zero')
  },
  {
    key: 'location',
    title: ({ location }) => location.text,
    iconName: 'map-marker-outline'
  },
  {
    key: 'date',
    title: ({ date }) => formatDateTime({ date }),
    iconName: 'clock-outline'
  },
  {
    key: 'website',
    title: ({ website }) => `${website || 'None'}`,
    iconName: 'web'
  },
  {
    key: 'description',
    title: ({ description }) => description,
    iconName: 'card-text-outline'
  },
  {
    key: 'delete',
    title: () => 'Delete Event',
    iconName: 'delete'
  }
]
