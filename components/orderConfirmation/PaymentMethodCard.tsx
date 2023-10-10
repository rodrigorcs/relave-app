import MastercardLogo from '../../assets/vectors/card-logo-mastercard.svg'
import VisaLogo from '../../assets/vectors/card-logo-visa.svg'
import { CustomText, ECustomTextVariants } from '../common'
import React, { FC } from 'react'
import { View } from 'react-native'

export enum EPaymentMethods {
  CARD_MASTERCARD = 'mastercard',
  CARD_VISA = 'visa',
}

interface IProps {
  paymentMethod: EPaymentMethods
  cardLastDigits?: string
}

export const PaymentMethodCard: FC<IProps> = ({ paymentMethod, cardLastDigits }) => {
  return (
    <View className="mt-4 flex-row items-center rounded-xl bg-neutrals-100 p-4">
      <View className="w-9 rounded bg-neutrals-white">
        {paymentMethod === EPaymentMethods.CARD_MASTERCARD && (
          <MastercardLogo height={24} pointerEvents="none" />
        )}
        {paymentMethod === EPaymentMethods.CARD_VISA && (
          <VisaLogo height={24} pointerEvents="none" />
        )}
      </View>
      <CustomText variant={ECustomTextVariants.BODY3} customClassName="flex-1 ml-4">
        {`**** ${cardLastDigits}`}
      </CustomText>
    </View>
  )
}
