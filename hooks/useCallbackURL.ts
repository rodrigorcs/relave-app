import { useStripe } from '@stripe/stripe-react-native'
import * as Linking from 'expo-linking'
import { useEffect, useCallback } from 'react'

export const useCallbackURL = () => {
  const { handleURLCallback } = useStripe()
  const url = Linking.useURL()

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url)
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  )

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL()
      handleDeepLink(initialUrl)
    }

    getUrlAsync()
  }, [handleDeepLink])

  useEffect(() => {
    handleDeepLink(url)
  }, [url])
}
