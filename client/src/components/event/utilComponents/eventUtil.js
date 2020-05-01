import Constants from 'expo-constants'
import { SCREEN_HEIGHT } from '@util/constants'
import { formatDateTime } from '@util'

export const adjustedScreenHeight = SCREEN_HEIGHT - Constants.statusBarHeight

export const eventDetails = [
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
    key: 'url',
    title: ({ url }) => `${url || 'None'}`,
    iconName: 'web'
  },
  {
    key: 'description',
    title: ({ description }) => description,
    iconName: 'card-text-outline'
  }
]
