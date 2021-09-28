import { firestore, timestamp } from '../firestore/firebase'
import { NotificationController } from '../controllers'
import {
  ISocialLink,
  IInvitesCreate,
  IInvitesAddToBatch,
  ESocialLinkAnswer,
  ENotificationType
} from '../interfaces'

const Users = firestore().collection('users')
const Invites = firestore().collection('invites')

export async function saveAll({
  senderId,
  recipientIds,
  eventId
}: IInvitesCreate): Promise<ISocialLink[] | null> {
  const inviteRef = Invites.doc()
  const batch = firestore().batch()
  let invites: ISocialLink[] = []

  recipientIds.forEach(async recipientId => {
    const notificationRef = Users.doc(recipientId)
      .collection('notifications')
      .doc()
    const invite = {
      id: inviteRef.id,
      senderId,
      recipientId,
      eventId,
      answer: ESocialLinkAnswer.REQUESTED,
      updated_at: timestamp.now(),
      created_at: timestamp.now()
    }
    // Add notification
    const notification = {
      id: notificationRef.id,
      senderId,
      type: ENotificationType.INVITE,
      viewed: false,
      socialLinkId: inviteRef.id,
      updated_at: timestamp.now(),
      created_at: timestamp.now()
    }

    batch.set(notificationRef, notification)
    batch.set(inviteRef, invite)
    invites.push(invite)
  })

  try {
    await batch.commit()
    return invites
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findById(
  id: string
): Promise<FirebaseFirestore.DocumentData | null> {
  const doc = await Invites.doc(id).get()
  if (doc.exists) {
    const invite = doc.data()
    if (invite) return invite
  }
  return null
}

export async function findAllByEventId(
  id: string
): Promise<FirebaseFirestore.DocumentData[] | null> {
  let invites: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Invites.where('eventId', '==', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let invite = doc.data()
        invite.id = doc.id
        invites.push(invite)
      })
      return invites
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findAllByRecipientId(
  id: string
): Promise<FirebaseFirestore.DocumentData[] | null> {
  let invites: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Invites.where('recipientId', '==', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let invite = doc.data()
        invite.id = doc.id
        invites.push(invite)
      })
      return invites
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export function addToBatch({
  senderId,
  recipientIds,
  eventId,
  batch
}: IInvitesAddToBatch): void {
  recipientIds.forEach(recipientId => {
    const inviteRef = Invites.doc()
    const invite = {
      id: inviteRef.id,
      senderId,
      recipientId,
      eventId,
      answer: ESocialLinkAnswer.REQUESTED,
      updated_at: timestamp.now(),
      created_at: timestamp.now()
    }
    // TODO: Notification cloud function
    batch.set(inviteRef, invite)
  })
}
