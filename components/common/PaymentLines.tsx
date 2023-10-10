import { EPaymentLineTypes, IPaymentLine } from '../../models/contracts/order'
import { cn } from '../../utils/cn'
import { getDisplayPrice } from '../../utils/price'
import { CustomText, ECustomTextVariants } from './CustomText'
import React, { FC } from 'react'
import { View } from 'react-native'

interface IProps {
  paymentLines: IPaymentLine[] | null
}

export const PaymentLines: FC<IProps> = ({ paymentLines }) => {
  return (
    <>
      {(paymentLines ?? []).map((paymentLine, index) => {
        const isSubtotal = paymentLine.type === EPaymentLineTypes.SUBTOTAL
        const isTotal = paymentLine.type === EPaymentLineTypes.TOTAL

        return (
          <View
            key={paymentLine.id}
            className={cn(
              'flex-row justify-between',
              index > 0 && 'mt-2',
              isSubtotal && 'mt-4 border-t border-neutrals-200 pt-4',
            )}
          >
            <CustomText
              variant={isTotal ? ECustomTextVariants.EXPRESSIVE3 : ECustomTextVariants.BODY3}
              customClassName="text-neutrals-900"
            >
              {paymentLine.name}
            </CustomText>
            <CustomText
              variant={isTotal ? ECustomTextVariants.EXPRESSIVE3 : ECustomTextVariants.BODY3}
              customClassName={cn(
                'text-right',
                isTotal ? 'text-neutrals-900' : 'text-neutrals-600',
              )}
            >
              {getDisplayPrice(paymentLine.price)}
            </CustomText>
          </View>
        )
      })}
    </>
  )
}
