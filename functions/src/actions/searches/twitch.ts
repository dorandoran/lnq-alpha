import * as functions from 'firebase-functions'

import { AxiosRequestConfig } from 'axios'
import { IGeneralRequestParams } from '../../interfaces'

const TWITCH_URL = 'https://gql.twitch.tv/gql'
const TWITCH_CLIENT_ID = functions.config().twitch.clientid

export async function getTwitchConfig(parameters: IGeneralRequestParams) {
  const data = JSON.stringify({
    query: `query {
          searchFor (options: null, userQuery: "", platform: "") {
              channels {
                  items {
                      id
                      displayName
                      broadcastSettings {
                          id
                          title
                      }
                  }
              }
          }
      }`,
    variables: {}
  })

  let config: AxiosRequestConfig = {
    method: 'post',
    url: TWITCH_URL,
    headers: {
      'Client-Id': TWITCH_CLIENT_ID,
      'Content-Ty': 'application/json',
      'Content-Type': 'application/json'
    },
    data
  }

  if (parameters.keyword) {
    config.data = JSON.stringify({
      query: `query {
          searchFor (options: null, userQuery: "${parameters.keyword}", platform: "") {
              channels {
                  items {
                      id
                      displayName
                      broadcastSettings {
                          id
                          title
                      }
                  }
              }
          }
      }`,
      variables: {}
    })
  }
  return config
}
