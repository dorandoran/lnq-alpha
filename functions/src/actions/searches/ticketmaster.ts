import * as functions from 'firebase-functions'
import { JSDOM } from 'jsdom'
import NodeGeocoder from 'node-geocoder'
import geohash from 'ngeohash'

import { AxiosRequestConfig } from 'axios'
import {
  IGeneralRequestParams,
  ITicketMasterGqlResponse
} from '../../interfaces'
import {
  IWebSearchResponse,
  ISearchEvent,
  ERequestTypes
} from '../../interfaces'

const TICKET_MASTER_URL = 'https://www.ticketmaster.com'
const TICKET_MASTER_GQL_URL = 'https://www.ticketmaster.com/api/next/graphql'

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: functions.config().google.api,
  language: 'en',
  region: 'US'
})

export async function getTicketMasterConfigGQL(
  parameters: IGeneralRequestParams
) {
  const keyword = parameters.keyword || ''
  const size = 20
  const rawCookie = 'user: ' + Math.random().toString(36).substr(2, 12)
  const encodedCookie = Buffer.from(rawCookie).toString('base64')

  let geoPoint = ''
  let config: AxiosRequestConfig = {
    method: 'post',
    url: TICKET_MASTER_GQL_URL,
    withCredentials: true,
    headers: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Cookie: `TMNUO=deast2_/${encodedCookie}; Path=/; Domain=ticketmaster.com; HttpOnly;`,
      'X-TM-Device': 'Desktop',
      'X-TM-Distil-Cookie': 'Valid',
      'X-TM-Unified-Origin': 'deast2',
      'X-TM-User-Name': 'na'
    }
  }

  if (parameters.city || parameters.state) {
    try {
      const locationRes = await geocoder.geocode(
        `${parameters.city ? parameters.city : ''} ${
          parameters.state ? parameters.state : ''
        }`
      )

      if (locationRes.length > 0) {
        if (locationRes[0].latitude && locationRes[0].longitude) {
          geoPoint = geohash.encode(
            locationRes[0].latitude,
            locationRes[0].longitude
          )
        }
      }
    } catch (e) {
      console.log('SearchParam error ', e)
    }
  }

  config.data = JSON.stringify({
    query: `query {
          products (query: { keyword: "${keyword}", radius: "10000", unit: "miles", sort: "relevance,desc", locale: "en-us", includeTBA: "yes", includeTBD: "yes", size: "${size}", page: "1", autocorrect: "yes", includeSpellcheck: "yes", geoPoint: "${geoPoint}"}) {
              items {
                  name
                  url
                  dates {
                      start {
                          dateTime
                      }
                  }
                  imagesFiltered {
                      url
                  }
              }
          }
      }`,
    variables: {}
  })

  return config
}

export async function getTicketMasterConfigREST(
  parameters: IGeneralRequestParams
) {
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

export function parseTicketmaster(
  response: IWebSearchResponse,
  type?: ERequestTypes
) {
  console.log('tm response ', response)
  if (!response || !response.data || !response.data.data) {
    return []
  }
  // console.log('tm response 2 ', response.data.data.products)

  if (type === ERequestTypes.REST) {
    const dom = new JSDOM(response.data)
    const doc = dom.window.document
    const content = doc.querySelectorAll('div.event-listing__item')
    const events: ISearchEvent[] = []

    content.forEach(eventElement => {
      const event = { name: '', url: '', date: '', img: '' }
      const name = eventElement.querySelector(
        'div.event-tile__title'
      ) as HTMLDivElement
      const url = eventElement.querySelector(
        'div.right__actions > a'
      ) as HTMLAnchorElement
      const img = eventElement.querySelector(
        'img.event-listing__thumbnail'
      ) as HTMLImageElement
      let date: HTMLDivElement | string = eventElement.querySelector(
        'div.event-listing__date > div.event-tile__date-title'
      ) as HTMLDivElement
      let time: HTMLDivElement | string = eventElement.querySelector(
        'div.event-listing__date > div.event-tile__sub-title'
      ) as HTMLDivElement

      date = date && date.textContent ? date.textContent : ''
      time = time && time.textContent ? time.textContent : ''

      event.name = name && name.textContent ? name.textContent : ''
      event.url = url ? url.href : ''
      event.date = `${date} ${time}`
      event.img = img ? img.src : ''
      events.push(event)
    })
    console.log('ticketmaster REST', events)
    return events
  }

  const content: ITicketMasterGqlResponse[] = response.data.data.products
    ? response.data.data.products.items
    : []
  const events: ISearchEvent[] = []

  content.forEach(eventElement => {
    console.log('tm here ', eventElement)
    const event = { name: '', url: '', date: '', img: '' }
    event.name = eventElement.name
    event.url = eventElement.url
    event.date = eventElement.dates.start.dateTime
    event.img = eventElement.imagesFiltered[0].url
    events.push(event)
  })
  console.log('ticketmaster ', events)
  return events
}
