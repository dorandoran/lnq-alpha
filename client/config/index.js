import Constants from 'expo-constants'
import dev from './dev.json'
import prod from './dev.json'

function getEnvVars(env = null) {
  if (env === null || env === undefined || env === '') return dev
  if (env.indexOf('dev') !== -1) return dev
  if (env.indexOf('staging') !== -1) return dev
  if (env.indexOf('prod') !== -1) return prod
  return dev
}

export default getEnvVars(Constants.manifest.releaseChannel)
