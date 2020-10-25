import admin from 'firebase-admin'
import { firestore, timestamp } from '../firestore/firebase'
import { EBuckets, IEvent, IEventCreate, IEventUpdate } from '../interfaces'
import { InviteController, FollowController } from '.'

const Events = firestore().collection('events')
const Users = firestore().collection('users')
const Media = firestore().collection('media')

export async function create({
  ownerId,
  image,
  followIds = [],
  recipientIds = [],
  ...eventRest
}: IEventCreate): Promise<IEvent | null> {
  const newAvatarRef = Media.doc()
  const eventRef = Events.doc()
  const storageAvatar = admin
    .storage()
    .bucket()
    .file(`${EBuckets.EVENTS}/${newAvatarRef.id}`)
  const batch = firestore().batch()
  const eventTimestamp = timestamp.now()

  const { createReadStream, mimetype } = await image
  const readStream = createReadStream(newAvatarRef.id)
  let uri = ''

  try {
    const response = await new Promise((resolve, reject) => {
      readStream.pipe(
        storageAvatar
          .createWriteStream({ contentType: mimetype })
          .on('error', () => reject(false))
          .on('finish', async () => {
            // get presigned url
            const uriResponse = await storageAvatar.getSignedUrl({
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

  const newAvatar = {
    id: newAvatarRef.id,
    linkIds: [eventRef.id],
    created_at: timestamp.now(),
    uri,
    ownerId
  }
  const newEvent = {
    ...eventRest,
    ownerId,
    id: eventRef.id,
    numLikes: 0,
    likes: [],
    updated_at: eventTimestamp,
    created_at: eventTimestamp,
    avatar: {
      id: newAvatar.id,
      uri: newAvatar.uri
    }
  }

  // Create Media
  batch.set(newAvatarRef, newAvatar)
  // Create Event
  batch.set(eventRef, newEvent)
  // Update User numEvents
  batch.update(Users.doc(ownerId), {
    numEvents: firestore.FieldValue.increment(1)
  })

  // Send Invites and Follows (Separate atomic actions)
  if (recipientIds.length) {
    InviteController.addToBatch({
      senderId: ownerId,
      recipientIds,
      eventId: eventRef.id,
      batch
    })
  }
  if (followIds.length) {
    FollowController.saveAll({ senderId: ownerId, recipientIds: followIds })
  }

  try {
    await batch.commit()
    return newEvent
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function update(
  eventUpdate: IEventUpdate
): Promise<FirebaseFirestore.DocumentData | null> {
  const { id, updates } = eventUpdate

  try {
    const update = await Events.doc(id).update(updates)
    if (update) return findById(id)
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function remove(id: string): Promise<boolean> {
  try {
    await Events.doc(id).delete()
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function findById(
  id?: string
): Promise<FirebaseFirestore.DocumentData | null> {
  if (!id) return null

  try {
    const doc = await Events.doc(id).get()
    if (doc.exists) {
      const event = doc.data()
      if (event) return event
      return null
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findAllByOwnerId(
  id?: string
): Promise<FirebaseFirestore.DocumentData[] | null> {
  let events: FirebaseFirestore.DocumentData[] = []
  try {
    const snapshot = await Events.where('ownerId', '==', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let event = doc.data()
        event.id = doc.id
        events.push(event)
      })
      return events
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}
