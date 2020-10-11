import { firestore, timestamp } from '../firestore/firebase'
import { pubsub } from '../../gql/server'
import {
  INotificationCreate,
  INotification,
  ESubscriptionType
} from '../interfaces'

const Users = firestore().collection('users')

export async function create({
  ownerId,
  senderId,
  type
}: INotificationCreate): Promise<INotification | null> {
  const notificationRef = Users.doc(ownerId).collection('notifications')
  const id = notificationRef.doc().id
  const newNotification = {
    id,
    senderId,
    type,
    viewed: false,
    created_at: timestamp.now()
  }

  try {
    await notificationRef.doc(id).set(newNotification)
    // Notification publish
    pubsub.publish(ESubscriptionType.NOTIFICATION_ADDED, {
      notificationAdded: newNotification
    })
    return newNotification
  } catch (e) {
    console.log(e)
    return null
  }
}
