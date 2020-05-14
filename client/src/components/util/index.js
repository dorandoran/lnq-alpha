import { createRef } from 'react'
import * as Device from 'expo-device'
import dayjs from 'dayjs'
import config from '@config'
import { NOTCH_LIST } from '@util/notchList'
import { DATE_FORMAT, TIME_FORMAT } from '@util/constants'

// Navigator Utils
export const navigationRef = createRef()
export const resetNavigate = options => {
  navigationRef.current?.reset(options)
}
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
export const stripTime = date => {
  return new Date(
    dayjs(date)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
  )
}

// Auth Context Util
export const getOAuthUserInfo = user => {
  const name = user?.displayName.length > 2 ? user?.displayName : null

  return {
    id: user?.uid,
    name,
    email: user?.email
  }
}

// Exports
export { default as theme } from './theme'
