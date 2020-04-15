/* eslint-disable promise/no-nesting */
const { auth } = require('../databases/firebase')
const User = require('../databases/store/user')

const developerMap = require('../config/devTokens')

const checkNewUser = body => {
  if (body.operationName === 'CreateUser') {
    return true
  }
  return false
}

const getToken = headers => {
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

const getUser = rawToken => {
  const tokenArr = rawToken.split(' ')
  const tokenType = tokenArr[0]
  const token = tokenArr[1]

  // Dev user check
  if (tokenType === 'RingBearer') {
    return getUserFromStore(token)
  }

  return auth()
    .verifyIdToken(token)
    .then(decodedToken => getUserFromStore(decodedToken.uid))
    .catch(e => {
      // TODO: Error Handling
      console.log(e)
    })
}

const getUserFromStore = id => {
  return User.findById({ id })
    .then(user => {
      return user
    })
    .catch(e => {
      // TODO: Error handling
      console.log(e)
    })
}

module.exports = {
  checkNewUser,
  getToken,
  getUser
}
