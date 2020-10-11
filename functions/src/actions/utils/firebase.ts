import { firestore, storage } from '../../services/firebase'
import {
  IMediaFindByLinkId,
  IMediaDelete,
  IStorageResponse
} from '../../interfaces'

export async function findAllMediaByLinkId({
  id,
  avatarId
}: IMediaFindByLinkId): Promise<FirebaseFirestore.DocumentData[] | null> {
  const Media = firestore().collection('media')
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
  const Media = firestore().collection('media')
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
