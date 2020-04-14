import Constants from 'expo-constants'

const ENV = {
  dev: {
    GRAPHQL_ENDPOINT:
      'https://us-central1-lnq-alpha.cloudfunctions.net/dbupdates',
    GOOGLE: {
      API_KEY: 'AIzaSyC1V1JZUnk_L_13zV4P6A96mCh3I87z9Ko',
      AUTH_DOMAIN: 'lnq-alpha.firebaseapp.com',
      DATABASE_URL: 'https://lnq-alpha.firebaseio.com',
      PROJECT_ID: 'lnq-alpha',
      STORAGE_BUCKET: 'lnq-alpha.appspot.com',
      MESSAGING_SENDER_ID: '650252507366',
      APP_ID: '1:650252507366:web:231fe87e0bc720d7ab4327',
      MEASUREMENT_ID: 'G-9WDTZ5KMXJ',
      ASYNC_ANDROID_CLIENT_ID:
        '650252507366-1mb3kjm7qtb42mnc7ktnop1qgvb37tpi.apps.googleusercontent.com',
      ASYNC_IOS_CLIENT_ID:
        '650252507366-a7r20o66k8jqekuajbmkcr6vjpairhsp.apps.googleusercontent.com'
    },
    FACEBOOK_ASYNC_ID: '880713082385563'
  },
  prod: {
    GRAPHQL_ENDPOINT:
      'https://us-central1-lnq-alpha.cloudfunctions.net/graphql',
    GOOGLE: {
      API_KEY: 'AIzaSyC1V1JZUnk_L_13zV4P6A96mCh3I87z9Ko',
      AUTH_DOMAIN: 'lnq-alpha.firebaseapp.com',
      DATABASE_URL: 'https://lnq-alpha.firebaseio.com',
      PROJECT_ID: 'lnq-alpha',
      STORAGE_BUCKET: 'lnq-alpha.appspot.com',
      MESSAGING_SENDER_ID: '650252507366',
      APP_ID: '1:650252507366:web:231fe87e0bc720d7ab4327',
      MEASUREMENT_ID: 'G-9WDTZ5KMXJ',
      ASYNC_ANDROID_CLIENT_ID:
        '650252507366-1mb3kjm7qtb42mnc7ktnop1qgvb37tpi.apps.googleusercontent.com',
      ASYNC_IOS_CLIENT_ID:
        '650252507366-a7r20o66k8jqekuajbmkcr6vjpairhsp.apps.googleusercontent.com'
    },
    FACEBOOK_ASYNC_ID: '880713082385563'
  }
}

function getEnvVars(env = null) {
  if (env === null || env === undefined || env === '') return ENV.dev
  if (env.indexOf('dev') !== -1) return ENV.dev
  if (env.indexOf('staging') !== -1) return ENV.dev
  if (env.indexOf('prod') !== -1) return ENV.prod
  return ENV.dev
}

export default getEnvVars(Constants.manifest.releaseChannel)
