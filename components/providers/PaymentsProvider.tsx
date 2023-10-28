import { Config } from '../../config/config'
import { EnvVariables } from '../../models/constants/EnvVariables'
import { StripeProvider } from '@stripe/stripe-react-native'
import React, { FC, ReactElement } from 'react'

interface IProps {
  children: ReactElement
}

export const PaymentsProvider: FC<IProps> = ({ children }) => {
  if (!EnvVariables.STRIPE_PUBLISHABLE_API_KEY) console.error('No Stripe publishable API Key')
  return (
    <StripeProvider
      publishableKey={EnvVariables.STRIPE_PUBLISHABLE_API_KEY as string}
      merchantIdentifier={Config.IOS_MERCHANT_IDENTIFIER}
    >
      {children}
    </StripeProvider>
  )
}
