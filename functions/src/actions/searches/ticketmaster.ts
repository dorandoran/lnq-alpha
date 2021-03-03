import * as functions from 'firebase-functions'
import NodeGeocoder from 'node-geocoder'
import geohash from 'ngeohash'

import { AxiosRequestConfig } from 'axios'
import { IGeneralRequestParams } from '../../interfaces'

const TICKET_MASTER_URL = 'https://www.ticketmaster.com'

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: functions.config().google.api,
  language: 'en',
  region: 'US'
})

export async function getTicketMasterConfig(parameters: IGeneralRequestParams) {
  const SORT = 'sort=relevance%2Cdesc'
  const TAB = 'tab=events'
  const RADIUS = 'radius=10000'
  let QUERY = ''
  let LOCATION = ''
  let DATE_RANGE = 'daterange=all'
  let config: AxiosRequestConfig = {
    method: 'get',
    url: TICKET_MASTER_URL
  }

  if (parameters.keyword && parameters.keyword.length) {
    QUERY = `q=${parameters.keyword}`
  }
  // const DATERANGE = `daterange=from${startDate}-to-${endDate}`
  if (parameters.city || parameters.state)
    try {
      const locationRes = await geocoder.geocode(
        `${parameters.city ? parameters.city : ''} ${
          parameters.state ? parameters.state : ''
        }`
      )

      if (locationRes.length > 0) {
        if (locationRes[0].latitude && locationRes[0].longitude) {
          const geoHash = geohash.encode(
            locationRes[0].latitude,
            locationRes[0].longitude
          )
          LOCATION = `geoHash=${geoHash}&unit=miles`
        }
      }
    } catch (e) {
      console.log('SearchParam error ', e)
    }
  config.url = `${TICKET_MASTER_URL}/search?${RADIUS}&${SORT}&${LOCATION}&${TAB}&${QUERY}&${DATE_RANGE}`
  console.log('ticketmaster ', config.url)
  return config
}
