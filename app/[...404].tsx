import { Unmatched, router, useGlobalSearchParams } from 'expo-router'
import { useEffect } from 'react'

const UnmatchedRoute = () => {
  const param = useGlobalSearchParams()

  useEffect(() => {
    // Firebase reCAPTCHA will redirect the user to firebase/link after complete
    if (param[404] === 'firebaseauth,link') {
      router.back()
      router.push('/otpConfirmation')
    }
  }, [])

  return <Unmatched />
}

export default UnmatchedRoute
