import MastercardLogo from '../../assets/vectors/card-logo-mastercard.svg'
import VisaLogo from '../../assets/vectors/card-logo-visa.svg'
import ConfirmedOrderIllustration from '../../assets/vectors/confirmed-order.svg'
import {
  CustomButton,
  CustomText,
  ECustomTextVariants,
  SafeAreaView,
} from '../../components/common'
import { EPaymentLineTypes } from '../../models/contracts/order'
import { getAppointment, getPaymentData, getPaymentLines } from '../../state/slices/order'
import { IAppState } from '../../state/store'
import { theme } from '../../theme'
import { formatPlaceAddress } from '../../utils/address'
import { cn } from '../../utils/cn'
import { EDateFormats, dayjs } from '../../utils/dayjs'
import { getDisplayPrice } from '../../utils/price'
import { router } from 'expo-router'
import {
  IconoirProvider,
  Calendar as CalendarIcon,
  PinAlt as LocationIcon,
} from 'iconoir-react-native'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function OrderConfirmation() {
  const appointment = useSelector(({ order }: IAppState) => getAppointment(order))
  const paymentLines = useSelector(({ order }: IAppState) => getPaymentLines(order))
  const paymentData = useSelector(({ order }: IAppState) => getPaymentData(order))

  const formattedPlaceAddress = formatPlaceAddress(appointment.place)

  const handleReturnToHome = () => {
    router.push('/home')
  }

  return (
    <SafeAreaView customClassName="flex flex-1 bg-common-background">
      <ScrollView>
        <View className="py-8 px-3 py w-fit items-center border-b border-neutrals-200">
          <ConfirmedOrderIllustration height={150} pointerEvents="none" />
          <CustomText variant={ECustomTextVariants.HEADING2} customClassName="mt-8">
            Pedido confirmado
          </CustomText>
          <CustomText
            variant={ECustomTextVariants.BODY2}
            customClassName="mt-2 text-neutrals-600 text-center"
          >
            Seu pedido foi verificado com sucesso e em breve estaremos indo até sua residência para
            realizar a lavagem do seu veículo.
          </CustomText>
        </View>
        <View className="px-4 py-8 border-b border-neutrals-200">
          <CustomText variant={ECustomTextVariants.HEADING3}>Informações do pedido</CustomText>
          <View className="mt-4">
            <IconoirProvider
              iconProps={{
                width: 24,
                height: 24,
                color: theme.colors['neutrals-600'],
              }}
            >
              <View className="flex-row items-center h-10">
                <CalendarIcon />
                <View className="ml-3">
                  <CustomText variant={ECustomTextVariants.BODY3}>
                    {formattedPlaceAddress.primaryText}
                  </CustomText>
                  <CustomText
                    variant={ECustomTextVariants.HELPER2}
                    customClassName="text-neutrals-500"
                  >
                    {formattedPlaceAddress.secondaryText}
                  </CustomText>
                </View>
              </View>
              <View className="flex-row items-center h-10 mt-1">
                <LocationIcon />
                <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-3">
                  {dayjs(appointment.time).format(EDateFormats.READABLE_DATE_TIME)}
                </CustomText>
              </View>
            </IconoirProvider>
          </View>
        </View>
        <View className="px-4 py-8 border-b border-neutrals-200">
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
        <View className="px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>Pagamento</CustomText>
          <View className="flex-row mt-4 p-4 items-center bg-neutrals-100 rounded-xl">
            <View className="w-9 bg-neutrals-white rounded">
              {paymentData?.cardBrand === 'mastercard' && (
                <MastercardLogo height={24} pointerEvents="none" />
              )}
              {paymentData?.cardBrand === 'visa' && <VisaLogo height={24} pointerEvents="none" />}
            </View>
            <CustomText variant={ECustomTextVariants.BODY3} customClassName="flex-1 ml-4">
              {`**** ${paymentData?.lastDigits}`}
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pt-6 pb-1 border-t border-neutrals-200">
        <CustomButton onPress={handleReturnToHome}>Voltar ao Início</CustomButton>
      </View>
    </SafeAreaView>
  )
}
