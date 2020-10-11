import { firestore, timestamp } from '../firestore/firebase'
import { IUser, IUserCreate, IUserUpdate } from '../interfaces'

const Users = firestore().collection('users')

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
