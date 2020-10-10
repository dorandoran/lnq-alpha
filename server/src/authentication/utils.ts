import { auth } from '../database/firestore/firebase'
import { UserController } from '../database/firestore/controllers'
import { IncomingHttpHeaders } from 'http'
import developerMap from '../config/devTokens'
import { IUser } from '../database/firestore/interfaces'

export function getToken(headers: IncomingHttpHeaders): string {
  const authorization = headers.authorization || ''
  const lnqdev = headers.lnqdev || null

  // Checks for dev user in headers
  if (lnqdev) {
    const testUser = developerMap.find(dev => {
      if (dev.token === lnqdev) return true
      return false
    })

    if (testUser) {
      return `RingBearer ${testUser.id}`
    }
  }
  return authorization
}

export async function getUser(
  rawToken: string
): Promise<FirebaseFirestore.DocumentData | null> {
  const tokenArr = rawToken.split(' ')
  const tokenType = tokenArr[0]
  const token = tokenArr[1]

  if (!token) return null
  if (tokenType === 'RingBearer') {
    return getUserFromStore(token)
  }

  try {
    const decodedToken = await auth().verifyIdToken(token)
    if (decodedToken) return getUserFromStore(decodedToken.uid)
  } catch (e) {
    console.log(e)
    return null
  }
  return null
}

export function checkNewUser(body: { operationName: string }): boolean {
  if (body.operationName === 'CreateUser') {
    return true
  }
  return false
}

async function getUserFromStore(
  id: string
): Promise<FirebaseFirestore.DocumentData | null> {
  try {
    return await UserController.findById(id)
  } catch (e) {
    console.log(e)
    return null
  }
}
