import admin from 'firebase-admin'
import { firestore, timestamp } from '../firestore/firebase'
import { MediaController } from '.'
import {
  IUser,
  IAvatar,
  IMessage,
  IUserCreate,
  IUserUpdate,
  INewUserUpdate,
  INewUserUpdateResponse,
  IUserUpdateAvatar,
  ICreateMessage,
  EBuckets
} from '../interfaces'

const Users = firestore().collection('users')
const Media = firestore().collection('media')

export async function create(
  userAttributes: IUserCreate
): Promise<IUser | null> {
  const newUser = {
    ...userAttributes,
    new: true,
    allowFollowers: true,
    numFollowers: 0,
    numFollowing: 0,
    numEvents: 0,
    created_at: timestamp.now()
  }

  try {
    const response = await Users.doc(userAttributes.id).set(newUser)
    if (response) return newUser
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function update(
  userUpdate: IUserUpdate
): Promise<FirebaseFirestore.DocumentData | null> {
  const { id, updates } = userUpdate

  try {
    const update = await Users.doc(id).update(updates)
    if (update) return findById(id)
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function updateNewUser({
  id,
  username,
  dob,
  website
}: INewUserUpdate): Promise<INewUserUpdateResponse> {
  const response = ''
  // Check username
  try {
    const snapshot = await Users.where('username', '==', username).get()
    if (!snapshot.empty) {
      return {
        response: 'That username is taken!',
        user: null
      }
    }
  } catch (e) {
    console.log(e)
    return {
      response: e,
      user: null
    }
  }

  // Update user
  try {
    const user = await update({ id, updates: { username, dob, website } })
    if (user) {
      return { response, user }
    }
  } catch (e) {
    return {
      response: e,
      user: null
    }
  }

  return {
    response: 'Oops! Please wait a few minutes and try again.',
    user: null
  }
}

export async function updateAvatar({
  id,
  image
}: IUserUpdateAvatar): Promise<IAvatar | null> {
  // Google cloud resources
  const newAvatarRef = Media.doc()
  const userRef = Users.doc(id)
  const storageAvatar = admin
    .storage()
    .bucket()
    .file(`${EBuckets.USERS}/${newAvatarRef.id}`)

  const { createReadStream, mimetype } = await image
  const readStream = createReadStream(newAvatarRef.id)
  let uri = ''

  // Upload image to google storage
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

  // Transaction user update and media create
  const avatar = {
    id: newAvatarRef.id,
    uri
  }
  const newMedia = {
    ...avatar,
    ownerId: id,
    created_at: timestamp.now(),
    linkIds: [id]
  }

  try {
    await firestore().runTransaction(async t => {
      const doc = await t.get(userRef)
      const user = doc.data()

      if (user && user.avatar) {
        t.delete(Media.doc(user.avatar.id))
        // Delete old avatar from storage
        await MediaController.removeMediaFromStorage({
          id: user.avatar.id,
          bucket: EBuckets.USERS
        })
      }

      t.update(Users.doc(id), { avatar })
      t.set(newAvatarRef, newMedia)
    })
    return avatar
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findById(
  id?: string
): Promise<FirebaseFirestore.DocumentData | null> {
  if (!id) return null
  try {
    const doc = await Users.doc(id).get()
    if (doc.exists) {
      const user = doc.data()
      if (user) return user
      return null
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function findByLinkIds(
  linkIds: string[]
): Promise<FirebaseFirestore.DocumentData[] | null> {
  let users: FirebaseFirestore.DocumentData[] = []

  try {
    const snapshot = await Users.where('id', 'in', linkIds).get()
    if (snapshot) {
      snapshot.forEach(doc => {
        const user = doc.data()
        users.push(user)
      })
      return users
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function createMessage({
  conversationId,
  senderId,
  recipientIds,
  text
}: ICreateMessage): Promise<IMessage | null> {
  const batch = firestore().batch()
  const SenderMessages = Users.doc(senderId).collection('messages')

  const senderMessageRef = conversationId
    ? SenderMessages.doc(conversationId)
    : SenderMessages.doc()
  const newMessage = {
    id: senderMessageRef.id,
    viewed: false,
    created_at: timestamp.now(),
    text,
    ownerId: senderId,
    linkIds: [senderId, ...recipientIds]
  }

  // Add sender to batch
  batch.set(senderMessageRef, newMessage)
  // Add recipients to batch
  recipientIds.forEach(recipientId => {
    const recipientMessageRef = Users.doc(recipientId)
      .collection('messages')
      .doc(senderMessageRef.id)
    batch.set(recipientMessageRef, newMessage)
  })

  try {
    await batch.commit()
    return newMessage
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getInboxById(
  id: string
): Promise<FirebaseFirestore.DocumentData | null> {
  let inbox: FirebaseFirestore.DocumentData[] = []
  try {
    const snapshot = await Users.doc(id).collection('messages').get()
    if (snapshot) {
      snapshot.forEach(doc => {
        let message = doc.data()
        inbox.push(message)
      })
      return inbox
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}
