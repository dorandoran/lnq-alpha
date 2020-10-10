import { firestore, timestamp } from '../firebase'
import { ISocialLink, IInvitesCreate, ESocialLinkAnswer } from '../interfaces'

const Invites = firestore().collection('invites')

export async function saveAll({
  senderId,
  recipientIds,
  eventId
}: IInvitesCreate): Promise<ISocialLink[] | null> {
  const batch = firestore().batch()
  let invites: ISocialLink[] = []

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
    // TODO: Add notification

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
