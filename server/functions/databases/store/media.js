const { firestore, storage } = require('../firebase')

// const storageRef = storage().bucket()
// const eventsRef = firestore().collection('events')
const mediaRef = firestore().collection('media')

// const upload = async media => {
//   const id = mediaRef.doc().id

//   const mediaBlob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.onload = function() {
//       resolve(xhr.response)
//     }
//     xhr.onerror = function(e) {
//       console.log(e)
//       reject(new TypeError('Network request failed'))
//     }
//     xhr.responseType = 'blob'
//     xhr.open('GET', media, true)
//     xhr.send(null)
//   })

//   const snap = await storageRef.child(`media/${id}`).put(mediaBlob)
//     // .then(snap => {
//     //   mediaBlob.close()
//     //   return {
//     //     id,
//     //     uri: snap.getDownloadURL()
//     //   }
//     // })
//     // .catch(e => {
//     //   console.log(e)
//     //   return null
//     // })

//   return mediaRef
//     .doc(media.id)
//     .set(media)
//     .then(() => {
//       return media
//     })
//     .catch(e => {
//       console.log(e)
//       return null
//     })
// }

// const saveToDb = media => {
//   return mediaRef
//     .doc(media.id)
//     .set(media)
//     .then(() => {
//       return media
//     })
//     .catch(e => {
//       console.log(e)
//       return null
//     })
// }

const findById = ({ id }) => {
  return mediaRef
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data()
      }
      return null
    })
    .catch(e => {
      console.log(e)
      return null
    })
}

module.exports = {
  // upload,
  // saveToDb,
  findById
}
