import { AxiosRequestConfig } from 'axios'
import { IGeneralRequestParams } from '../../interfaces'

const EVENTBRITE_URL = 'https://www.eventbrite.com'

export async function getEventbriteConfig(parameters: IGeneralRequestParams) {
  const ONLINE_EVENT_PATH = 'd/online'
  let config: AxiosRequestConfig = {
    method: 'get',
    url: EVENTBRITE_URL
  }

  if (parameters.keyword) {
    config.url = `${EVENTBRITE_URL}/${ONLINE_EVENT_PATH}/${parameters.keyword}`
    console.log('eventbrite ', config.url)
  }
  return config
}
