import { Config } from '../config/config'
import { paymentActions } from '../core/actions/payments'
import { theme } from '../theme'
import { useStripe } from '@stripe/stripe-react-native'
import { useState, useEffect } from 'react'

export const useStripePaymentSheet = (
  stripeCustomerId: string | null,
  orderId: string | null,
  amount: number | null,
) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false)

  const initializePaymentSheet = async (validStripeCustomerId: string, validOrderId: string) => {
    setIsLoading(true)

    try {
      if (!amount) throw new Error('No amount to charge')
      const { paymentIntentClientSecret, customerEphemeralKeySecret, customerId } =
        await paymentActions.createPaymentIntent(validStripeCustomerId, validOrderId, amount)

      await initPaymentSheet({
        merchantDisplayName: 'Relave',
        customerId: customerId ?? undefined,
        customerEphemeralKeySecret,
        paymentIntentClientSecret: paymentIntentClientSecret as string,
        returnURL: 'com.rodrigorcs.relave://checkout',
        applePay: { merchantCountryCode: 'BR' },
        googlePay: {
          merchantCountryCode: 'BR',
          testEnv: !Config.IS_PROD
        },
        style: 'alwaysLight',
        appearance: {
          colors: {
            background: theme.colors['common-background'],
            primary: theme.colors['brand-500'],
            error: theme.colors['feedback-negative-300'],
            primaryText: theme.colors['neutrals-800'],
            secondaryText: theme.colors['neutrals-500'],
            placeholderText: theme.colors['neutrals-400'],
            componentText: theme.colors['neutrals-800'],
            componentBorder: theme.colors['neutrals-200'],
            componentDivider: theme.colors['neutrals-200'],
            componentBackground: theme.colors['common-background'],
            icon: theme.colors['neutrals-500'],
          },
          shapes: { shadow: { opacity: 0 }, borderRadius: 12, borderWidth: 1 },
          primaryButton: { shapes: { borderRadius: 24 } },
        },
        primaryButtonLabel: 'Confirmar pagamento',
        defaultBillingDetails: { address: { country: 'BR' } },
      })
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (stripeCustomerId && orderId) {
      initializePaymentSheet(stripeCustomerId, orderId)
    }
  }, [stripeCustomerId, orderId])

  const openPaymentSheet = async () => {
    try {
      const result = await presentPaymentSheet()
      if (!result.error) setIsWaitingConfirmation(true)
    } catch (error) {
      setError(error)
    }
  }

  if (error) console.error(error)

  return [openPaymentSheet, isLoading, isWaitingConfirmation, error] as const
}
