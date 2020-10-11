import { firestore, timestamp } from '../firestore/firebase'
import { ISocialLink, IFollowRequest, ESocialLinkAnswer } from '../interfaces'

const Follows = firestore().collection('follows')

export async function saveAll({
  senderId,
  recipientIds
}: IFollowRequest): Promise<ISocialLink[] | null> {
  const batch = firestore().batch()
  let follows: ISocialLink[] = []

  recipientIds.forEach(recipientId => {
    if (recipientId === senderId) return null
    const followRef = Follows.doc()
    const follow = {
      id: followRef.id,
      senderId,
      recipientId,
      answer: ESocialLinkAnswer.REQUESTED,
      updated_at: timestamp.now(),
      created_at: timestamp.now()
    }

    batch.set(followRef, follow)
    follows.push(follow)
  })

  try {
    await batch.commit()
    return follows
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findAllBySenderId(
  id: string
): Promise<FirebaseFirestore.DocumentData[] | null> {
  let follows: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Follows.where('senderId', '==', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let follow = doc.data()
        follow.id = doc.id
        follows.push(follow)
      })
      return follows
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
  let follows: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Follows.where('recipientId', '==', id).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let follow = doc.data()
        follow.id = doc.id
        follows.push(follow)
      })
      return follows
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}
