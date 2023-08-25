import { Unmatched, router, useGlobalSearchParams } from 'expo-router'
import { useEffect } from 'react'

const UnmatchedRoute = () => {
  const param = useGlobalSearchParams()

  useEffect(() => {
    if (param[404] === 'firebaseauth,link') {
      router.back()
      router.push('/otpConfirmation')
    }
  }, [])

  return <Unmatched />
}

export default UnmatchedRoute
