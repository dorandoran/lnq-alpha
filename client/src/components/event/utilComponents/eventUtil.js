import Constants from 'expo-constants'
import { SCREEN_HEIGHT } from '@components/util/constants'
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
    key: 'description'
  },
  {
    key: 'url',
    title: ({ url }) => `Website: ${url || 'None'}`
  }
]
