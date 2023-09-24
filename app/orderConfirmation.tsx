import { CustomText, ECustomTextVariants } from '../components/common'
import { EPaymentLineTypes } from '../models/contracts/order'
import { getPaymentLines } from '../state/slices/order'
import { IAppState } from '../state/store'
import { cn } from '../utils/cn'
import { getDisplayPrice } from '../utils/price'
import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function OrderConfirmation() {
  const paymentLines = useSelector(({ order }: IAppState) => getPaymentLines(order))

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="px-4 py-8">
        <CustomText variant={ECustomTextVariants.HEADING3}>Resumo dos itens</CustomText>
        <View className="mt-4">
          {(paymentLines ?? []).map((paymentLine, index) => {
            const isSubtotal = paymentLine.type === EPaymentLineTypes.SUBTOTAL
            const isTotal = paymentLine.type === EPaymentLineTypes.TOTAL

            return (
              <View
                key={paymentLine.id}
                className={cn(
                  'flex-row justify-between',
                  index > 0 && 'mt-2',
                  isSubtotal && 'pt-4 mt-4 border-t border-neutrals-200',
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
        </View>
      </View>
    </SafeAreaView>
  )
}
