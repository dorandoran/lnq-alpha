import { createRef } from 'react'
import * as Device from 'expo-device'
import dayjs from 'dayjs'
import config from '@config'
import { NOTCH_LIST } from '@util/notchList'
import { Dimensions } from 'react-native'

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

export const KEYBOARD_AVOID_HEIGHT = SCREEN_HEIGHT / 7

export const CAMERA_SELECTION = 'camera'
export const GALLERY_SELECTION = 'gallery'

export const BUCKET = {
  EVENT: 'events',
  MEDIA: 'media',
  USER: 'user'
}

export const DATE_FORMAT = 'MMM D, YYYY'
export const TIME_FORMAT = 'h:mm A'
export const TOMORROW_DATETIME = new Date(
  new Date().getTime() + 24 * 60 * 60 * 1000
)

export const EVENT_TYPES = {
  food: 'Food and Drink',
  art: 'Art',
  game: 'Gaming',
  sport: 'Sports',
  beauty: 'Beauty',
  fitness: 'Fitness',
  health: 'Health and Wellness',
  learning: 'Learning',
  family: 'Family',
  outdoors: 'Outdoors',
  tech: 'Tech and Science',
  music: 'Music',
  culture: 'Culture and Community',
  film: 'Film and Media',
  dance: 'Dance',
  movements: 'Movements',
  animals: 'Animals',
  fashion: 'Fashion',
  social: 'Social',
  business: 'Business',
  hobby: 'Hobbies',
  photo: 'Photo and Video',
  spirit: 'Spirituality',
  season: 'Seasonal',
  auto: 'Auto',
  comedy: 'Comedy',
  other: 'Other'
}

export const INPUT_TYPES = {
  name: 'Event Name',
  type: 'Event Type',
  location: 'Event Location',
  date: 'Date and Time',
  url: 'Website',
  description: 'Description',
  plusOne: 'Plus One',
  isPrivate: 'Private'
}

export const EVENT_TYPES_ARRAY = Object.keys(EVENT_TYPES).map(key => {
  return { label: EVENT_TYPES[key], value: key }
})

// Navigator Utils
export const navigationRef = createRef()
export const navigate = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params)
}

// Device Specific Utils
export const hasNotch = () => {
  const { modelName: model, brand } = Device

  if (model && brand) {
    // If in dev mode and using an Android simulator,
    // you must set DEVICE.NOTCH properly in dev.json
    if (model === 'AOSP on IA Emulator') {
      return config.DEVICE.NOTCH
    }

    return (
      NOTCH_LIST.findIndex(
        device =>
          device.model.toLowerCase() === model.toLowerCase() &&
          device.brand.toLowerCase() === brand.toLowerCase()
      ) !== -1
    )
  }
}

export const isIphone = () => {
  const { brand } = Device

  if (brand) {
    return brand.toLowerCase() === 'apple'
  }
  return false
}

// Date Utils
export const formatDateTime = ({ type, date }) => {
  if (type === 'date') return dayjs(date).format(DATE_FORMAT)
  if (type === 'time') return dayjs(date).format(TIME_FORMAT)
  return dayjs(date).format(`${DATE_FORMAT}  |  ${TIME_FORMAT}`)
}

// Exports
export { default as theme } from './theme'
