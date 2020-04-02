import { useState, useEffect } from 'react'
import { storage, firestore } from '@services/firebase'

const useStorage = ({ rawMedia, bucketName }) => {
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(false)
  const id = firestore.collection(bucketName).doc().id
  const eventStorage = storage.ref().child(`${bucketName}/${id}`)

  useEffect(() => {
    let didCancel = false

    async function upload() {
      setLoading(true)

      !didCancel && setLoading(true)
      // Create blob from media uri
      try {
        const mediaBlob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = function() {
            resolve(xhr.response)
          }
          xhr.onerror = function(e) {
            console.log(e)
            reject(new TypeError('Network request failed'))
          }
          xhr.responseType = 'blob'
          xhr.open('GET', rawMedia, true)
          xhr.send(null)
        })

        // Send blob to storage
        const snap = await eventStorage.put(mediaBlob)
        !didCancel && setMedia({ id, uri: snap.getDownloadURL() })
      } catch (e) {
        // TODO: Proper error handling
        console.log(e)
      } finally {
        !didCancel && setLoading(false)
      }
    }
    upload()

    // Clean up
    return () => {
      didCancel = true
    }
  }, [])

  return { media, loading }
}

export default useStorage
