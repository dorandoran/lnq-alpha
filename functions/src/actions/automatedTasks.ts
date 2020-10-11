import * as functions from 'firebase-functions'
import { firestore, timestamp } from '../services/firebase'
import { createNotification } from './utils/firebase'
import { IFollow, INotificationCreate, ENotificationType } from '../interfaces'

const Users = firestore().collection('users')
const Follows = firestore().collection('follows')

export const automaticallyAllowFollowers = functions.firestore
  .document('follows/{followId}')
  .onCreate(async change => {
    const follow = change.data() as IFollow
    const { id, recipientId, senderId } = follow
    const recipientRef = Users.doc(recipientId)
    const senderRef = Users.doc(senderId)

    try {
      const response = await firestore().runTransaction(async t => {
        // Get Current User with follower
        const doc = await t.get(recipientRef)
        const recipient = doc.data()

        if (recipient && recipient.allowFollowers) {
          const answerUpdate = {
            answer: 'ACCEPTED',
            updated_at: timestamp.now()
          }

          // Update counts
          t.update(recipientRef, {
            numFollowers: firestore.FieldValue.increment(1)
          })
          t.update(senderRef, {
            numFollowing: firestore.FieldValue.increment(1)
          })

          // Update follow
          t.update(Follows.doc(id), answerUpdate)

          return {
            changed: true,
            message: `${recipientId} allowed ${senderId}`
          }
        }

        return {
          changed: false,
          message: `${recipientId} does not auto-allow followers`
        }
      })

      if (response.changed) {
        try {
          const notification: INotificationCreate = {
            ownerId: recipientId,
            senderId: senderId,
            type: ENotificationType.FOLLOW
          }
          await createNotification(notification)
        } catch (e) {
          console.log(e)
        }
      }
      console.log(response.message)
    } catch (e) {
      console.log(e)
    }
  })
