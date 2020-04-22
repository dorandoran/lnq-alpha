import Constants from 'expo-constants'
import dayjs from 'dayjs'
import {
  DATE_FORMAT,
  TIME_FORMAT,
  SCREEN_HEIGHT
} from '@components/util/constants'

export const adjustedScreenHeight = SCREEN_HEIGHT - Constants.statusBarHeight

export const detailsMap = [
  {
    key: 'location',
    title: ({ location }) => location.text,
    iconName: 'map-marker-outline'
  },
  {
    key: 'date',
    title: ({ date }) =>
      dayjs(date).format(`${DATE_FORMAT}  |  ${TIME_FORMAT}`),
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