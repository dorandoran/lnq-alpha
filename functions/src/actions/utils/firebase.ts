import { firestore, storage, timestamp } from '../../services/firebase'
import {
  IMediaFindByLinkId,
  IMediaDelete,
  IStorageResponse,
  INotificationCreate,
  INotification
} from '../../interfaces'

const Media = firestore().collection('media')
const Users = firestore().collection('users')

export async function findAllMediaByLinkId({
  id,
  avatarId
}: IMediaFindByLinkId): Promise<FirebaseFirestore.DocumentData[] | null> {
  let media: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Media.where('linkIds', 'array-contains', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let item = doc.data()
        item.id = doc.id
        media.push(item)
      })

      // Put avatar media first
      media.forEach((item, i) => {
        if (item.id === avatarId) {
          media.splice(i, 1)
          media.unshift(item)
        }
      })
      return media
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function removeMedia({
  id,
  linkId,
  bucket,
  force
}: IMediaDelete): Promise<IStorageResponse> {
  const Link = firestore().collection(bucket).doc(linkId)

  try {
    // Firestore transaction
    await firestore().runTransaction(async t => {
      // Check link data
      const doc = await t.get(Link)
      const link = doc.data()

      if ((link && link.avatarId !== id) || force) {
        t.delete(Media.doc(id))
        return ''
      } else {
        throw 'Cannot delete avatarId'
      }
    })
  } catch (e) {
    console.log(e)
    return {
      completed: false,
      error: e
    }
  }

  try {
    await storage().file(`${bucket}/${id}`).delete()
    return {
      completed: true,
      error: ''
    }
  } catch (e) {
    console.log(e)
    return {
      completed: false,
      error: 'Problem deleting from storage.'
    }
  }
}

export async function createNotification({
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
    return newNotification
  } catch (e) {
    console.log(e)
    return null
  }
}
