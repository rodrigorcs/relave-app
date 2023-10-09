import { storage } from '../utils/firebase'
import { useState, useEffect } from 'react'

export const useCloudImage = (imageEndpoint: string): [string | null, unknown | null] => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<unknown | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _imageUrl = await storage().ref(imageEndpoint).getDownloadURL()
        setImageUrl(_imageUrl)
        if (_imageUrl === null) setError('Image does not exist')
      } catch (e) {
        console.warn(e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return [imageUrl, error]
}
