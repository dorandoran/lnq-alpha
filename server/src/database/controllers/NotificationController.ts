import { firestore, timestamp } from '../firestore/firebase'
import { INotificationCreate, INotification } from '../interfaces'

const Users = firestore().collection('users')

export async function create({
  ownerId,
  senderId,
  type
}: INotificationCreate): Promise<INotification | null> {
  const newNotification = {
    senderId,
    type,
    viewed: false,
    created_at: timestamp.now()
  }

  try {
    await Users.doc(ownerId).collection('notifications').add(newNotification)
    return newNotification
  } catch (e) {
    console.log(e)
    return null
  }
}
