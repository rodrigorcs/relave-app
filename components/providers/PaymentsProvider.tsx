import { Config } from '../../models/constants/Config'
import { StripeProvider } from '@stripe/stripe-react-native'
import React, { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}

export const PaymentsProvider: FC<IProps> = ({ children }) => {
  if (!Config.STRIPE_PUBLISHABLE_API_KEY) console.error('No Stripe publishable API Key')
  return (
    <StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_API_KEY as string}>
      {children}
    </StripeProvider>
  )
}
