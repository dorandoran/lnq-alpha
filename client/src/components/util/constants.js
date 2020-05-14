import { Dimensions } from 'react-native'
import dayjs from 'dayjs'

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
export const EIGHTEEN_YRS_AGO = new Date(
  dayjs()
    .subtract(18, 'year')
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
)
export const PLACEHOLDER_18_YRS = new Date(
  dayjs(EIGHTEEN_YRS_AGO)
    .set('minute', 13)
    .set('second', 29)
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

export const EVENT_TYPES_ARRAY = Object.keys(EVENT_TYPES).map(key => {
  return { label: EVENT_TYPES[key], value: key }
})
