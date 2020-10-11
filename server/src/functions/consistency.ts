import * as functions from 'firebase-functions'
import { storage, auth } from '../database/firestore/firebase'
import { MediaController } from '../database/firestore/controllers'

// Firestore Media Cleanup - Deletes Media attached to just-deleted Events
export const deleteMediaFromEvents = functions.firestore
  .document('events/{eventId}')
  .onDelete(async snap => {
    const event = snap.data()
    // TODO: Add Error Handling
    const eventMedia = await MediaController.findAllByLinkId({ id: event.id })

    if (eventMedia?.length) {
      eventMedia.forEach(async media => {
        try {
          await MediaController.remove({
            id: media.id,
            linkId: event.id,
            bucket: 'events',
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
      await storage().file(`events/${media.id}`).delete()
      await storage().file(`users/${media.id}`).delete()
    } catch (e) {
      console.log(e)
    }
  })
