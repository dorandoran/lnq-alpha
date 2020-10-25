import admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { auth } from '../services/firebase'
import { findAllMediaByLinkId, removeMedia } from './utils/firebase'
import { EBuckets } from '../interfaces'

// Firestore Media Cleanup - Deletes Media attached to just-deleted Events
export const deleteMediaFromEvents = functions.firestore
  .document('events/{eventId}')
  .onDelete(async snap => {
    const event = snap.data()
    // TODO: Add Error Handling
    const eventMedia = await findAllMediaByLinkId({ id: event.id })

    if (eventMedia?.length) {
      eventMedia.forEach(async media => {
        try {
          await removeMedia({
            id: media.id,
            linkId: event.id,
            bucket: EBuckets.EVENTS,
            force: true
          })
        } catch (e) {
          console.log(e)
        }
      })
    }
  })

// Authentication User Cleanup - Deletes Users from authentication if deleted from firestore
export const deleteUserFromAuth = functions.firestore
  .document('users/{userId}')
  .onDelete(async snap => {
    const user = snap.data()
    // TODO: Add Error Handling
    await auth().deleteUser(user.id)
  })

// Storage Media Cleanup - Deletes Media from Storage when deleted from Firestore
export const deleteMediaFromStorage = functions.firestore
  .document('media/{mediaId}')
  .onDelete(async snap => {
    const media = snap.data()

    try {
      await admin.storage().bucket().file(`events/${media.id}`).delete()
      await admin.storage().bucket().file(`users/${media.id}`).delete()
    } catch (e) {
      console.log(e)
    }
  })
