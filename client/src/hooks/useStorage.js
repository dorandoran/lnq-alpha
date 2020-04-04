import { useState, useEffect } from 'react'
import { storage, firestore } from '@services/firebase'
import useCreateMedia from '@graphql/media/useCreateMedia'
import { useUser } from '@context/userContext'
import { EVENT_CONST, MEDIA_CONST } from '@common/constants'

const useStorage = ({ localMediaUri, bucketName, skip }) => {
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(false)
  const createMedia = useCreateMedia()
  const userId = useUser()

  // TODO: Fix constants
  const mediaRef = firestore.collection(MEDIA_CONST).doc()
  const eventRef = firestore.collection(EVENT_CONST).doc()
  const eventStorage = storage.ref().child(`${bucketName}/${mediaRef.id}`)

  useEffect(() => {
    let didCancel = false

    async function upload() {
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
        xhr.open('GET', localMediaUri, true)
        xhr.send(null)
      })

      // Send blob to storage
      const newMedia = { id: mediaRef.id, userId, linkId: eventRef.id }
      const uploadTask = eventStorage.put(mediaBlob)

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
          newMedia.uri = await eventStorage.getDownloadURL()

          // Save Media to Firestore
          createMedia(newMedia)
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
