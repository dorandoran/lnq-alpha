import { firestore, timestamp } from '../firestore/firebase'
import { SearchController } from '../../search/algolia'
import {
  ISocialLink,
  IFollowRequest,
  ESocialLinkAnswer,
  ESearchUserType
} from '../interfaces'

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
    const snapshot = await Follows.where('senderId', '==', id)
      .where('answer', '==', ESocialLinkAnswer.ACCEPTED)
      .get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let follow = doc.data()
        follow.id = doc.id
        follows.push(follow)
      })

      const results = await SearchController.user({
        userId: id,
        type: ESearchUserType.FOLLOW,
        filters: follows.map(follow => follow.recipientId)
      })

      if (results) {
        return follows.map(follow => {
          return {
            ...follow,
            recipient: results.find(user => user.id === follow.recipientId)
          }
        })
      }
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
    const snapshot = await Follows.where('recipientId', '==', id)
      .where('answer', '==', ESocialLinkAnswer.ACCEPTED)
      .get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let follow = doc.data()
        follow.id = doc.id
        follows.push(follow)
      })

      const results = await SearchController.user({
        userId: id,
        type: ESearchUserType.FOLLOW,
        filters: follows.map(follow => follow.senderId)
      })

      if (results) {
        return follows.map(follow => {
          return {
            ...follow,
            sender: results.find(user => user.id === follow.senderId)
          }
        })
      }
      return follows
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}
