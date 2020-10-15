import { useState, useEffect } from 'react'
import { storage, firestore } from '@services/firebase'
import useCreateMedia from '@graphql/media/useCreateMedia'
import useUser from '@context/userContext'
import { BUCKET } from '@util'

const useStorage = ({ uri, bucketName, linkId, skip, onSuccess, onStart }) => {
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(false)
  const createMedia = useCreateMedia()
  const { id: ownerId } = useUser()
  let newMediaLinkId = linkId

  const mediaRef = firestore.collection(BUCKET.MEDIA).doc()
  const mediaStorage = storage.ref().child(`${bucketName}/${mediaRef.id}`)

  if (!newMediaLinkId) {
    newMediaLinkId = firestore.collection(bucketName).doc().id
  }

  useEffect(() => {
    // Clean up variable
    let didCancel = false

    async function upload() {
      if (onStart) onStart()
      !didCancel && setLoading(true)
      !didCancel && setMedia(null)
      // Create blob from media uri
      const mediaBlob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
          resolve(xhr.response)
        }
        xhr.onerror = function (e) {
          console.log(e)
          !didCancel && setLoading(false)
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
      })

      // Send blob to storage
      const newMedia = { id: mediaRef.id, ownerId, linkId: newMediaLinkId }
      const uploadTask = mediaStorage.put(mediaBlob)

      // Check progress
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        // Error sending media
        error => {
          // TODO: Error handling
          console.log(error)
          !didCancel && setLoading(false)
        },
        // Finished sending media
        async () => {
          mediaBlob.close()
          newMedia.uri = await mediaStorage.getDownloadURL()

          // Save Media to Firestore
          createMedia(newMedia)
          if (onSuccess) onSuccess()
          !didCancel && setMedia(newMedia)
          !didCancel && setLoading(false)
        }
      )
    }
    if (!skip && !loading) upload()

    // Clean up
    return () => {
      didCancel = true
    }
  }, [skip])

  return { media, loading }
}

export default useStorage
