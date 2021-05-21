import { AxiosRequestConfig } from 'axios'
import { JSDOM } from 'jsdom'
import { ESearchParameters } from '../../interfaces'

import {
  IGeneralRequestParams,
  IWebSearchResponse,
  ISearchEvent
} from '../../interfaces'

const EVENTBRITE_URL = 'https://www.eventbrite.com'

export async function getEventbriteConfig(parameters: IGeneralRequestParams) {
  const ONLINE_EVENT_PATH = 'd/online'
  const SEPARATOR = '-'
  let config: AxiosRequestConfig = {
    method: 'get',
    url: EVENTBRITE_URL
  }

  if (parameters.keyword.length) {
    const keyword = parameters[ESearchParameters.KEYWORD].reduce(
      (accumulator, current) => {
        return accumulator + SEPARATOR + current
      },
      ''
    )
    config.url = `${EVENTBRITE_URL}/${ONLINE_EVENT_PATH}/${keyword}`
  }
  return config
}

export function parseEventbrite(response: IWebSearchResponse) {
  const dom = new JSDOM(response.data)
  const doc = dom.window.document
  const content = doc.querySelectorAll('div.eds-event-card--consumer')
  const events: ISearchEvent[] = []

  content.forEach(eventElement => {
    const event = { name: '', url: '', date: '', img: '' }
    const url = eventElement.querySelector('a')
    const date = eventElement.querySelector(
      'div.eds-event-card-content__primary-content > div'
    ) as HTMLDivElement
    const img = eventElement.querySelector(
      'img.eds-event-card-content__image'
    ) as HTMLImageElement
    let name: ChildNode | null = eventElement.querySelector(
      'div[data-spec="event-card__formatted-name"]'
    )

    name = name && name.childNodes.length > 0 ? name.childNodes[0] : null

    event.name = name && name.textContent ? name.textContent : ''
    event.url = url ? url.href : ''
    event.date = date && date.textContent ? date.textContent : ''
    event.img = img && img.dataset && img.dataset.src ? img.dataset.src : ''
    events.push(event)
  })
  return events
}
