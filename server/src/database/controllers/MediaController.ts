import admin from 'firebase-admin'
import { firestore, timestamp } from '../firestore/firebase'
import {
  IMedia,
  IMediaCreate,
  IMediaRemove,
  IMediaRemoveFromStorage,
  IMediaFindByLinkId,
  IStorageResponse
} from '../interfaces'

const Media = firestore().collection('media')

export async function create({
  ownerId,
  linkId,
  type,
  image
}: IMediaCreate): Promise<IMedia | null> {
  const newMediaRef = Media.doc()
  const storageMedia = admin
    .storage()
    .bucket()
    .file(`${type}/${newMediaRef.id}`)
  const linkIds = linkId ? [linkId] : [ownerId]

  const { createReadStream, mimetype } = await image
  const readStream = createReadStream(newMediaRef.id)
  let uri = ''

  try {
    const response = await new Promise((resolve, reject) => {
      readStream.pipe(
        storageMedia
          .createWriteStream({ contentType: mimetype })
          .on('error', () => reject(false))
          .on('finish', async () => {
            // get presigned url
            const uriResponse = await storageMedia.getSignedUrl({
              action: 'read',
              expires: '01-01-2400'
            })

            uri = uriResponse[0]
            resolve(true)
          })
      )
    })

    if (!response) return null
  } catch (e) {
    console.log(e)
    return null
  }

  const newMedia = {
    id: newMediaRef.id,
    uri,
    ownerId,
    created_at: timestamp.now(),
    linkIds
  }

  try {
    const media = await newMediaRef.set(newMedia)
    if (media) {
      return newMedia
    }
    return null
  } catch (e) {
    // If error saving to database, remove from storage
    await removeMediaFromStorage({ id: newMediaRef.id, bucket: type })
    console.log(e)
    return null
  }
}

export async function remove({
  id,
  linkId,
  type,
  force
}: IMediaRemove): Promise<IStorageResponse> {
  const Link = firestore().collection(type).doc(linkId)

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
      error: e as string
    }
  }

  return removeMediaFromStorage({ id, bucket: type })
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

export async function findAllByLinkId({
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

export async function removeMediaFromStorage({
  id,
  bucket
}: IMediaRemoveFromStorage): Promise<IStorageResponse> {
  try {
    await admin.storage().bucket().file(`${bucket}/${id}`).delete()
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
