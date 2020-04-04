import { Dimensions } from 'react-native'

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

export const CAMERA_SELECTION = 'camera'
export const GALLERY_SELECTION = 'gallery'

export const KEYBOARD_AVOID_HEIGHT = SCREEN_HEIGHT / 7

// Google Firebase/Cloud Path Constants
export const EVENT_CONST = 'events'
export const MEDIA_CONST = 'media'
export const USER_CONST = 'users'

export const DATE_FORMAT = 'MMMM D, YYYY'
export const TIME_FORMAT = 'h:mm A'
export const TOMORROW_DATETIME = new Date(
  new Date().getTime() + 24 * 60 * 60 * 1000
)
