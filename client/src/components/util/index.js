import * as Device from 'expo-device'
import { CONTAINS_NOTCH } from '@components/util/constants'
import config from '@config'

export const hasNotch = () => {
  const { modelName: model, brand } = Device

  if (model && brand) {
    // If in dev mode using a simulator, you must set this in dev.json
    if (model === 'AOSP on IA Emulator') {
      return config.DEVICE.NOTCH
    }

    return (
      CONTAINS_NOTCH.findIndex(
        device =>
          device.model.toLowerCase() === model.toLowerCase() &&
          device.brand.toLowerCase() === brand.toLowerCase()
      ) !== -1
    )
  }
}
