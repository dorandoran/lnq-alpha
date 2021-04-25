import * as functions from 'firebase-functions'

import { AxiosRequestConfig } from 'axios'
import {
  IGeneralRequestParams,
  IWebSearchResponse,
  ISearchStream,
  ITwitchGqlResponse
} from '../../interfaces'

const TWITCH_URL = 'https://www.twitch.tv'
const TWITCH_GQL_URL = 'https://gql.twitch.tv/gql'
const TWITCH_CLIENT_ID = functions.config().twitch.clientid

export async function getTwitchConfig(parameters: IGeneralRequestParams) {
  const keyword = parameters.keyword || ''

  let config: AxiosRequestConfig = {
    method: 'post',
    url: TWITCH_GQL_URL,
    headers: {
      'Client-Id': TWITCH_CLIENT_ID,
      'Content-Ty': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  if (parameters.keyword) {
    config.data = JSON.stringify({
      query: `query {
          searchFor (options: null, userQuery: "${keyword}", platform: "") {
              channels {
                  items {
                      id
                      displayName
                      broadcastSettings {
                          id
                          title
                      }
                      profileImageURL (width: 150)
                  }
              }
          }
      }`,
      variables: {}
    })
  }
  return config
}

export function parseTwitch(response: IWebSearchResponse) {
  if (!response || !response.data || !response.data.data) {
    console.log('twitch error ', response)
    return []
  }

  const content: ITwitchGqlResponse[] = response.data.data.searchFor
    ? response.data.data.searchFor.channels.items
    : []
  const streams: ISearchStream[] = []

  content.forEach(streamElement => {
    const stream = { name: '', streamName: '', url: '', img: '' }
    stream.name = streamElement.displayName
    stream.streamName = streamElement.broadcastSettings.title
    stream.url = `${TWITCH_URL}/${stream.name}`
    stream.img = streamElement.profileImageURL
    streams.push(stream)
  })
  console.log('twitch ', streams)
  return streams
}
