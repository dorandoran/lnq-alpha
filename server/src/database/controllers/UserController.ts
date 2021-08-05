import admin from 'firebase-admin'
import { omit } from 'lodash'
import { firestore, timestamp } from '../firestore/firebase'
import { MediaController } from '.'
import { IUserUpdateInput } from '../interfaces/User'
import {
  IFile,
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
  userUpdate: IUserUpdateInput
): Promise<FirebaseFirestore.DocumentData | null> {
  const { id, updates } = userUpdate
  let mediaResponse
  let userUpdates: IUserUpdate = omit(update, [
    'addBookmarkEvents',
    'removeBookmarkEvents'
  ])

  // Handling Images
  if (updates.avatar || updates.bannerAvatar) {
    const avatarPromises = []
    let bannerAvatarFlag = false

    // Add avatar to promise
    if (updates.avatar) {
      avatarPromises.push(
        MediaController.create({
          ownerId: id,
          type: EBuckets.USERS,
          image: updates.avatar as Promise<IFile>
        })
      )
    }
    if (updates.bannerAvatar) {
      bannerAvatarFlag = true
      avatarPromises.push(
        MediaController.create({
          ownerId: id,
          type: EBuckets.USERS,
          image: updates.bannerAvatar as Promise<IFile>
        })
      )
    }

    try {
      mediaResponse = await Promise.all(avatarPromises)
      // Revert changes if error
      if (mediaResponse.find(res => res === null)) {
        console.log('Error updating the avatar!')
        mediaResponse.forEach(async response => {
          if (response) {
            await MediaController.removeMediaFromStorage({
              id: response.id,
              bucket: EBuckets.USERS
            })
          }
        })
        return null
      }

      // Update the avatar object for database
      if (bannerAvatarFlag) {
        // Only bannerAvatar updated
        if (mediaResponse.length === 1 && mediaResponse[0]) {
          userUpdates.bannerAvatar = {
            id: mediaResponse[0].id,
            uri: mediaResponse[0].uri
          }
        } else {
          // Both avatars updated
          if (mediaResponse[0] && mediaResponse[1]) {
            userUpdates.avatar = {
              id: mediaResponse[0].id,
              uri: mediaResponse[0].uri
            }
            userUpdates.bannerAvatar = {
              id: mediaResponse[1].id,
              uri: mediaResponse[1].uri
            }
          }
        }
      } else {
        // Only avatar updated
        if (mediaResponse[0]) {
          userUpdates.avatar = {
            id: mediaResponse[0].id,
            uri: mediaResponse[0].uri
          }
        }
      }
    } catch (e) {
      console.log('Error updating the avatar!')
      console.log(e)
      return null
    }
  }

  try {
    // Handling Event Bookmarks
    if (updates?.addBookmarkEvents) {
      const { addBookmarkEvents } = updates
      userUpdates.bookmarkEvents = admin.firestore.FieldValue.arrayUnion(
        ...(addBookmarkEvents as string[])
      )
    }
    if (updates?.removeBookmarkEvents) {
      const { removeBookmarkEvents } = updates
      userUpdates.bookmarkEvents = admin.firestore.FieldValue.arrayRemove(
        ...(removeBookmarkEvents as string[])
      )
    }

    const update = await Users.doc(id).update(userUpdates)
    if (update) return findById(id)
    return null
  } catch (e) {
    // Remove created media from storage
    if (mediaResponse) {
      mediaResponse.forEach(async response => {
        if (response) {
          await MediaController.removeMediaFromStorage({
            id: response.id,
            bucket: EBuckets.USERS
          })
        }
      })
    }
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
      response: e as string,
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
      response: e as string,
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
          .on('error', e => {
            console.log('error', e)
            reject(false)
          })
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
