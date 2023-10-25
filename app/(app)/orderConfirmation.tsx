import ConfirmedOrderIllustration from '../../assets/vectors/confirmed-order.svg'
import {
  CustomButton,
  CustomText,
  ECustomTextVariants,
  SafeAreaView,
} from '../../components/common'
import { PaymentLines } from '../../components/common/PaymentLines'
import {
  EPaymentMethods,
  PaymentMethodCard,
} from '../../components/orderConfirmation/PaymentMethodCard'
import { clear, getOrder } from '../../state/slices/order'
import { IAppState } from '../../state/store'
import { theme } from '../../theme'
import { formatPlaceAddress } from '../../utils/address'
import { EDateFormats, dayjs } from '../../utils/dayjs'
import { truncateText } from '../../utils/string'
import { router } from 'expo-router'
import {
  IconoirProvider,
  Calendar as CalendarIcon,
  PinAlt as LocationIcon,
} from 'iconoir-react-native'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default function OrderConfirmation() {
  const dispatch = useDispatch()

  const order = useSelector(({ order }: IAppState) => getOrder(order))
  const { appointment, paymentLines, payment, shortId } = order

  const formattedPlaceAddress = formatPlaceAddress(appointment.place)

  const handleReturnToHome = () => {
    dispatch(clear())
    router.push('/(app)')
  }

  return (
    <SafeAreaView customClassName="flex flex-1 bg-common-background">
      <ScrollView>
        <View className="py w-fit items-center border-b border-neutrals-200 px-3 py-8">
          <ConfirmedOrderIllustration height={150} pointerEvents="none" />
          <CustomText
            variant={ECustomTextVariants.SUBHEADING3}
            customClassName="mt-6 text-neutrals-400"
          >
            {`#${shortId}`}
          </CustomText>
          <CustomText variant={ECustomTextVariants.HEADING2} customClassName="mt-2">
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
        <View className="border-b border-neutrals-200 px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>Informações do pedido</CustomText>
          <View className="mt-4">
            <IconoirProvider
              iconProps={{
                width: 24,
                height: 24,
                color: theme.colors['neutrals-600'],
              }}
            >
              <View className="h-10 flex-row items-center">
                <LocationIcon />
                <View className="ml-3">
                  <CustomText variant={ECustomTextVariants.BODY3}>
                    {formattedPlaceAddress.primaryText}
                  </CustomText>
                  <CustomText
                    variant={ECustomTextVariants.HELPER2}
                    customClassName="text-neutrals-500"
                  >
                    {truncateText(formattedPlaceAddress.secondaryText ?? '', 48)}
                  </CustomText>
                </View>
              </View>
              <View className="mt-1 h-10 flex-row items-center">
                <CalendarIcon />
                <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-3">
                  {dayjs.unix(appointment.time ?? 0).format(EDateFormats.READABLE_DATE_TIME)}
                </CustomText>
              </View>
            </IconoirProvider>
          </View>
        </View>
        <View className="border-b border-neutrals-200 px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>Resumo dos itens</CustomText>
          <View className="mt-4">
            <PaymentLines paymentLines={paymentLines} />
          </View>
        </View>
        <View className="px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>Pagamento</CustomText>
          <PaymentMethodCard
            paymentMethod={payment?.cardBrand as EPaymentMethods}
            cardLastDigits={payment?.lastDigits ?? undefined}
          />
        </View>
      </ScrollView>
      <View className="border-t border-neutrals-200 px-4 pb-1 pt-6">
        <CustomButton onPress={handleReturnToHome}>Voltar ao Início</CustomButton>
      </View>
    </SafeAreaView>
  )
}
