const firestore = require('../firestore')
const storage = require('../fileStorage')

// GC Firestore
const eventsRef = firestore.collection('events')

// GC Storage
const bucketName = 'gs://lnq-alpha.appspot.com'
const bucket = storage.bucket(bucketName)

const upload = media => {
  const ref = eventsRef.doc()
  const fileName = ref.id

  try {
    const blob = bucket.file(fileName)
    const blobStream = blob.createWriteStream()

    blobStream.on('error', error =>
      console.log('Something went wrong: ' + error)
    )
    blobStream.on('finish', () => {
      const mediaUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      return { id: ref.id, uri: mediaUrl }
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  upload
}
