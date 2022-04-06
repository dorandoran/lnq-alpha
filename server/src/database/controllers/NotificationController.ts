import { firestore, timestamp } from '../firestore/firebase'
import { INotificationCreate, INotification } from '../interfaces'

const Users = firestore().collection('users')

export async function create({
  ownerId,
  senderId,
  socialLinkId,
  type
}: INotificationCreate): Promise<INotification | null> {
  const notificationRef = Users.doc(ownerId).collection('notifications')
  const id = notificationRef.doc().id
  const newNotification: INotification = {
    id,
    senderId: senderId || ownerId,
    type,
    viewed: false,
    created_at: timestamp.now(),
    updated_at: timestamp.now()
  }

  if (socialLinkId) {
    newNotification.socialLinkId = socialLinkId
  }

  try {
    await notificationRef.doc(id).set(newNotification)
    // Notification publish
    // pubsub.publish(ESubscriptionType.NOTIFICATION_ADDED, {
    //   notificationAdded: newNotification
    // })
    return newNotification
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getAllByUserId(
  id: string
): Promise<FirebaseFirestore.DocumentData[] | null> {
  const notificationRef = Users.doc(id).collection('notifications')
  let notifications: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await notificationRef.get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let notification = doc.data()
        notification.id = doc.id
        notifications.push(notification)
      })
      return notifications
    }
    return null
  } catch (e) {
    console.log(e)
  }
  return null
}
