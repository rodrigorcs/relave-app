import { useStripe } from "@stripe/stripe-react-native"
import { useState, useEffect } from "react"
import { theme } from "../theme"
import { paymentActions } from "../core/actions/payments"

export const useStripePaymentSheet = (amount: number | undefined, stripeCustomerId: string | undefined) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(false)

  const initializePaymentSheet = async (stripeCustomerId: string) => {
    setIsLoading(true)

    try {
      if (!amount) throw new Error('No amount to charge')
      const { paymentIntentClientSecret, customerEphemeralKeySecret, customerId } = await paymentActions.createPaymentIntent(amount, stripeCustomerId ?? null)

      await initPaymentSheet({
        merchantDisplayName: 'Lavei',
        customerId: customerId ?? undefined,
        customerEphemeralKeySecret,
        paymentIntentClientSecret: paymentIntentClientSecret as string,
        returnURL: 'com.rodrigorcs.laveiapp://checkout',
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
    if (stripeCustomerId) {
      initializePaymentSheet(stripeCustomerId);
    }
  }, [stripeCustomerId]);

  const openPaymentSheet = async () => {
    try {
      await presentPaymentSheet()
    } catch (error) {
      setError(error)
    }
  }

  if (error) console.error(error)

  return [openPaymentSheet, isLoading, error] as const
}