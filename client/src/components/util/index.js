import { createRef } from 'react'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import dayjs from 'dayjs'
import config from '@config'
import { NOTCH_LIST } from '@util/notchList'
import { Dimensions } from 'react-native'

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width
export const ADJUSTED_HEIGHT = SCREEN_HEIGHT - Constants.statusBarHeight

export const KEYBOARD_AVOID_HEIGHT = SCREEN_HEIGHT / 7

export const CAMERA_SELECTION = 'camera'
export const GALLERY_SELECTION = 'gallery'

export const BUCKET = {
    EVENT: 'events',
    MEDIA: 'media',
    USER: 'users',
    NEW: 'new'
}

export const DATE_FORMAT = 'MMM D, YYYY'
export const TIME_FORMAT = 'h:mm A'
export const TOMORROW_DATETIME = new Date(
    new Date().getTime() + 24 * 60 * 60 * 1000
)
export const EIGHTEEN_YRS_AGO = new Date(
    dayjs().subtract(18, 'year').set('hour', 0).set('minute', 0).set('second', 0)
)
export const PLACEHOLDER_18_YRS = new Date(
    dayjs(EIGHTEEN_YRS_AGO).set('minute', 13).set('second', 29)
)

export const EVENT_TYPES = {
    food: 'Food and Drink',
    game: 'Gaming',
    sport: 'Sports & Fitness',
    beauty: 'Healthy & Beauty',
    tech: 'Tech and Science',
    culture: 'Culture and Community',
    entertainment: 'Media and Entertainment',
    social: 'Social',
    fashion: 'Fashion',
    family: 'Family & Kids',
    outdoors: 'Outdoors',
    business: 'Business',
    spirit: 'Spirituality',
    auto: 'Auto',
    other: 'Other'
}

export const EVENT_FIELD_TITLES = {
    name: 'Event Name',
    type: 'Event Type',
    location: 'Event Location',
    date: 'Date and Time',
    website: 'Website',
    description: 'Description',
    plusOne: 'Plus One',
    isPrivate: 'Private'
}

export const EVENT_TYPES_ARRAY = Object.keys(EVENT_TYPES).map(key => {
    return { label: EVENT_TYPES[key], value: key }
})

// Navigator Utils
export const navigationRef = createRef()
export const resetNavigate = options => {
    navigationRef.current?.reset(options)
}
export const navigate = (routeName, params) => {
    navigationRef.current?.navigate(routeName, params)
}
export const goBack = () => {
    navigationRef.current?.goBack()
}

// Device Specific Utils
export const hasNotch = () => {
    const { modelName: model, brand, deviceName } = Device

    if (model && brand) {
        // If in dev mode and using an Android simulator,
        // you must set DEVICE.NOTCH properly in dev.json
        if (model === 'AOSP on IA Emulator') {
            return config.DEVICE.NOTCH
        }

        return (
            NOTCH_LIST.findIndex(
                device =>
                    ((device.model.toLowerCase() === model.toLowerCase()) ||
                        (device.model.toLowerCase() === deviceName.toLowerCase())) &&
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
export const stripTime = date => {
    return new Date(dayjs(date).set('hour', 0).set('minute', 0).set('second', 0))
}

// Auth Context Util
export const getOAuthUserInfo = user => {
    return {
        id: user?.uid,
        email: user?.email
    }
}

// Exports
export { default as theme } from './theme'
