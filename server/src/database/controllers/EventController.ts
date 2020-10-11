import { firestore, timestamp } from '../firestore/firebase'
import { IEvent, IEventCreate, IEventUpdate } from '../interfaces'
import { InviteController, FollowController } from '.'

const Events = firestore().collection('events')
const Users = firestore().collection('users')

export async function create(
  eventAttributes: IEventCreate
): Promise<IEvent | null> {
  const batch = firestore().batch()
  const eventTimestamp = timestamp.now()
  const newEvent = {
    ...eventAttributes,
    numLikes: 0,
    likes: [],
    updated_at: eventTimestamp,
    created_at: eventTimestamp
  }

  // Create Event
  batch.set(Events.doc(newEvent.id), newEvent)
  // Update User numEvents
  batch.update(Users.doc(eventAttributes.ownerId), {
    numEvents: firestore.FieldValue.increment(1)
  })

  // Send Invites and Follows (Separate atomic actions)
  const { id, ownerId, followIds = [], recipientIds = [] } = eventAttributes
  if (recipientIds.length) {
    InviteController.saveAll({ senderId: ownerId, recipientIds, eventId: id })
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
