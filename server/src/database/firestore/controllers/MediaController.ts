import { firestore, storage, timestamp } from '../firebase'
import {
  IMedia,
  IMediaCreate,
  IMediaDelete,
  IStorageResponse
} from '../interfaces'

const Media = firestore().collection('media')
const Events = firestore().collection('events')

export async function create(
  mediaAttributes: IMediaCreate
): Promise<IMedia | null> {
  const id = Media.doc().id
  const newMedia = {
    ...mediaAttributes,
    id,
    created_at: timestamp.now(),
    linkIds: mediaAttributes.linkId
      ? [mediaAttributes.linkId]
      : [Events.doc().id] // Case when creating event avatar
  }

  try {
    const media = await Media.doc(id).set(newMedia)
    if (media) {
      return newMedia
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function remove({
  id,
  linkId,
  bucket
}: IMediaDelete): Promise<IStorageResponse> {
  const Link = firestore().collection(bucket).doc(linkId)

  try {
    // Firestore transaction
    await firestore().runTransaction(async t => {
      // Check link data
      const doc = await t.get(Link)
      const link = doc.data()

      if (link && link.avatarId !== id) {
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

export async function findById(
  id: string
): Promise<FirebaseFirestore.DocumentData | null> {
  try {
    const doc = await Media.doc(id).get()
    if (doc.exists) {
      const media = doc.data()
      if (media) return media
      return null
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findAllByLinkId(
  id: string,
  avatarId: string
): Promise<FirebaseFirestore.DocumentData[] | null> {
  let media: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Media.where('linkIds', 'array-contains', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let item = doc.data()
        item.id = doc.id
        media.push(item)
      })
      return media
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}
