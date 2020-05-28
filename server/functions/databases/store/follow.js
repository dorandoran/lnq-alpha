const { firestore } = require('../../services/firebase')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp
const usersRef = firestore().collection('users')

const saveAllToDb = ({ senderId, recipientIds }) => {
  const writeBatch = firestore().batch()
  const socialLinks = []

  recipientIds.forEach(recipientId => {
    // Following
    const followingRef = usersRef
      .doc(senderId)
      .collection('following')
      .doc(recipientId)

    // Follower
    const followersRef = usersRef
      .doc(recipientId)
      .collection('followers')
      .doc(senderId)

    // Create new document
    let socialLink = {
      senderId,
      recipientId,
      answer: 'REQUESTED',
      updated_at: timestamp.now()
    }

    writeBatch.set(followingRef, socialLink)
    writeBatch.set(followersRef, socialLink)
    socialLinks.push(socialLink)
  })

  return writeBatch
    .commit()
    .then(() => {
      return socialLinks
    })
    .catch(e => {
      // TODO: Error Handling
      console.log(e)
      return null
    })
}

const findAllByUserId = ({ type, userId }) => {
  // type: SocialLinkType
  const socialLinkRef = usersRef.doc(userId).collection(type.toLowerCase())
  const isFollowing = type === 'FOLLOWING'
  let socialLinks = []

  return socialLinkRef
    .get()
    .then(snap => {
      snap.forEach(doc => {
        link = doc.data()
        // Creates a foreign-key id
        link.id = `${userId}-${isFollowing ? link.recipientId : link.senderId}`
        link.type = type
        socialLinks.push(link)
      })
      return socialLinks
    })
    .catch(e => {
      console.log(e)
      return socialLinks
    })
}

const findAcceptedByUserId = ({ type, userId }) => {
  // type: SocialLinkType
  const socialLinkRef = usersRef.doc(userId).collection(type.toLowerCase())
  let socialLinks = []

  return socialLinkRef
    .where('answer', '==', 'ACCEPTED')
    .get()
    .then(snap => {
      snap.forEach(doc => {
        socialLinks.push(doc.data())
      })
      return socialLinks
    })
    .catch(e => {
      console.log(e)
      return socialLinks
    })
}

module.exports = {
  saveAllToDb,
  findAllByUserId,
  findAcceptedByUserId
}
