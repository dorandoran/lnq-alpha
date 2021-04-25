import * as functions from 'firebase-functions'
import cors from 'cors'

import { QueryBuilder } from './utils/queryBuilder'
import { parseEventbrite, parseTwitch, parseTicketmaster } from './searches'
import { hasOnlyDigits, isUsState, isCity } from './utils/validators'
import { ESearchTypes, ESearchParameters } from '../interfaces'

// Global Variables
const corsHandler = cors({ origin: true })

export const search = async (
  req: functions.Request,
  res: functions.Response
) => {
  // CORs
  corsHandler(req, res, () => {})

  let status = 400
  let response = {
    error: 'An error occurred!',
    status,
    tm: {},
    eb: {},
    ebNew: {},
    tw: {},
    twNew: {}
  }
  const { text } = req.query

  if (text && typeof text === 'string') {
    const query = new QueryBuilder()

    // Split text by space
    // Iterate through elements in text and determine what they are
    const textArr = text.split(' ')
    textArr.forEach((e: any, i) => {
      // Check if state
      if (isUsState(e)) {
        query.add(ESearchParameters.STATE, e)
        // Check for zip
      } else if (hasOnlyDigits(e)) {
        query.add(ESearchParameters.ZIP, e)
        // Check for city
      } else if (isCity(e, i, textArr)) {
        query.add(ESearchParameters.CITY, e)
      } else {
        query.add(ESearchParameters.KEYWORD, e)
      }
    })
    // Ensure proper error handling

    // Search Ticket Master
    const ticketMasterResponse = await query.searchOne(
      ESearchTypes.TICKET_MASTER
    )
    const tm = parseTicketmaster(ticketMasterResponse)

    // Search Eventbrite
    const eventbriteResponse = await query.searchOne(ESearchTypes.EVENTBRITE)
    const ebNew = parseEventbrite(eventbriteResponse)

    // Search Twitch
    const twitchResponse = await query.searchOne(ESearchTypes.TWITCH)
    const twNew = parseTwitch(twitchResponse)

    // Sending a default success code
    status = 200
    response = {
      status,
      error: '',
      tm,
      eb: eventbriteResponse,
      ebNew,
      tw: twitchResponse,
      twNew
    }
  }

  res.status(status).send(response)
}
