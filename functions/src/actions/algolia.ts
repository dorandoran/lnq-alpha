import * as functions from 'firebase-functions'
import { firestore } from '../services/firebase'
import { searchIndex } from '../services/algolia'

import IndexFactory from './utils/indexFactory'
import { IAlgoliaUser, IAlgoliaEvent } from '../interfaces'

export const indexAll = async (
  req: functions.Request,
  res: functions.Response
) => {
  const Users = firestore().collection('users')
  const Events = firestore().collection('events')

  const users: IAlgoliaUser[] = []
  const events: IAlgoliaEvent[] = []

  /** Index Users */
  try {
    // Get current user list
    const usersSnap = await Users.get()
    usersSnap.forEach(doc => {
      users.push(IndexFactory.user(doc.data()))
    })

    // Clear current Index
    await searchIndex.users.clearObjects()
    // Search Index User Default Settings
    await searchIndex.users.setSettings({
      attributesForFaceting: ['id'],
      searchableAttributes: [
        'username',
        'firstName',
        'lastName',
        'website',
        'email'
      ],
      hitsPerPage: 25
    })
    await searchIndex.users.saveObjects(users)
  } catch (e) {
    console.log(e)
  }

  /** Index Events */
  try {
    // Get current event list
    const eventsSnap = await Events.get()
    eventsSnap.forEach(doc => {
      events.push(IndexFactory.event(doc.data()))
    })

    // Clear current index
    await searchIndex.events.clearObjects()
    // Search Index Event Default Settings
    await searchIndex.events.setSettings({
      attributesForFaceting: ['ownerId', 'isPrivate'],
      hitsPerPage: 25
    })
    await searchIndex.events.saveObjects(events)
  } catch (e) {
    console.log(e)
  }

  res.status(200).send('Indexing Finished!')
}

export const updateUserIndex = functions.firestore
  .document('users/{userId}')
  .onWrite(async change => {
    let user = change.after.exists ? change.after.data() : null

    // User deleted
    if (!user) {
      user = change.before.data()

      if (user) await searchIndex.users.deleteObject(user.id)
      // User created or modified
    } else {
      user = IndexFactory.user(user)
      await searchIndex.users.saveObject(user)
    }
  })

export const updateEventIndex = functions.firestore
  .document('events/{eventId}')
  .onWrite(async change => {
    let event = change.after.exists ? change.after.data() : null

    // Event deleted
    if (!event) {
      event = change.before.data()

      if (event) await searchIndex.events.deleteObject(event.id)
      // Event created or modified
    } else {
      // TODO: Decide what data to update
      // i.e: Index should not update every "like"
      event = IndexFactory.event(event)
      await searchIndex.events.saveObject(event)
    }
  })
