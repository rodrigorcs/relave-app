import { CustomButton, CustomText, ECustomTextVariants } from '../components/common'
import { IService } from '../models/contracts/service'
import { IServiceBundle, IServiceBundleWithDetails } from '../models/contracts/serviceBundle'
import { getSelectedAdditionalServices, getSelectedServiceBundle } from '../state/slices/cart'
import { IAppState } from '../state/store'
import { theme } from '../theme'
import { cn } from '../utils/cn'
import { httpClient } from '../utils/httpClient'
import { getDisplayPrice } from '../utils/price'
import { useStripe } from '@stripe/stripe-react-native'
import {
  ArrowRight as ArrowRightIcon,
  Calendar as CalendarIcon,
  PinAlt as LocationIcon,
} from 'iconoir-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, View } from 'react-native'
import { useSelector } from 'react-redux'

enum ECheckoutItemTypes {
  SERVICE_BUNDLE = 'serviceBundle',
  ADDITIONAL_SERVICE = 'additionalService',
  SUBTOTAL = 'subtotal',
  DISCOUNT = 'discount',
  TOTAL = 'total',
}

interface ICheckoutItem {
  type: ECheckoutItemTypes
  id: string
  name: string
  price: number
}

interface ICartItems {
  serviceBundle: IServiceBundle | IServiceBundleWithDetails
  additionalServices: IService[]
}

const serviceBundleToCheckoutItem = (
  serviceBundle: IServiceBundle | IServiceBundleWithDetails,
): ICheckoutItem => {
  return {
    type: ECheckoutItemTypes.SERVICE_BUNDLE,
    id: serviceBundle.id,
    name: serviceBundle.name,
    price: serviceBundle.price,
  }
}

const additionalServicesToCheckoutItems = (additionalServices: IService[]): ICheckoutItem[] => {
  return additionalServices.map((service) => ({
    type: ECheckoutItemTypes.ADDITIONAL_SERVICE,
    id: service.id,
    name: service.name,
    price: service.price,
  }))
}

const calculateSumFromCheckoutItems = (checkoutItems: ICheckoutItem[]): number => {
  return checkoutItems.reduce((accumulator, checkoutItem) => {
    return accumulator + checkoutItem.price
  }, 0)
}

const cartToCheckoutItems = ({
  serviceBundle,
  additionalServices,
}: ICartItems): ICheckoutItem[] => {
  const serviceBundleCheckoutItem = serviceBundleToCheckoutItem(serviceBundle)
  const additionalServicesCheckoutItems = additionalServicesToCheckoutItems(additionalServices)

  const subtotal: ICheckoutItem = {
    type: ECheckoutItemTypes.SUBTOTAL,
    id: ECheckoutItemTypes.SUBTOTAL,
    name: 'Subtotal',
    price: calculateSumFromCheckoutItems([
      serviceBundleCheckoutItem,
      ...additionalServicesCheckoutItems,
    ]),
  }

  const discount: ICheckoutItem = {
    type: ECheckoutItemTypes.DISCOUNT,
    id: ECheckoutItemTypes.DISCOUNT,
    name: 'Desconto',
    price: 0,
  }

  const total: ICheckoutItem = {
    type: ECheckoutItemTypes.TOTAL,
    id: ECheckoutItemTypes.TOTAL,
    name: 'Total',
    price: calculateSumFromCheckoutItems([subtotal, discount]),
  }

  return [serviceBundleCheckoutItem, ...additionalServicesCheckoutItems, subtotal, discount, total]
}

export default function Checkout() {
  const serviceBundle = useSelector(({ cart }: IAppState) => getSelectedServiceBundle(cart))
  const additionalServices = useSelector(({ cart }: IAppState) =>
    getSelectedAdditionalServices(cart),
  )

  const checkoutItems = serviceBundle && cartToCheckoutItems({ serviceBundle, additionalServices })

  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [, /*loading*/ setLoading] = useState(false)

  const fetchPaymentSheetParams = async () => {
    const response = await httpClient.get(
      `http://127.0.0.1:5001/lavei-firebase/us-central1/paymentSheet`,
    )

    console.log({ response: response.data })
    const { setupIntent, ephemeralKey, customer } = response.data

    return {
      setupIntent,
      ephemeralKey,
      customer,
    }
  }

  const initializePaymentSheet = async () => {
    console.log('initializePaymentSheet')
    const { setupIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      setupIntentClientSecret: setupIntent,
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
      // intentConfiguration: {
      //   mode: { amount: 500, currencyCode: 'BRL' },
      //   confirmHandler(paymentMethod, shouldSavePaymentMethod, intentCreationCallback) {},
      // },
    })
    console.log('initPaymentSheet')
    if (error) console.error(error)
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message)
    } else {
      Alert.alert('Success', 'Your payment method is successfully set up for future payments!')
    }
  }

  useEffect(() => {
    initializePaymentSheet()
  }, [])

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1">
        <View className="px-4 py-8 border-b border-neutrals-200">
          <CustomText variant={ECustomTextVariants.HEADING3}>Informações do pedido</CustomText>
          <View className="flex-row mt-4">
            <View className="flex-1 h-32 p-4 justify-between rounded-2xl border border-neutrals-200">
              <LocationIcon width={20} height={20} color={theme.colors['neutrals-800']} />
              <CustomText variant={ECustomTextVariants.BODY3}>
                Av. João Paulo VI, 2300, Centro
              </CustomText>
            </View>
            <View className="flex-1 h-32 p-4 justify-between rounded-2xl border border-neutrals-200 ml-4">
              <CalendarIcon width={20} height={20} color={theme.colors['neutrals-800']} />
              <CustomText variant={ECustomTextVariants.BODY3}>09 de Setembro às 08:00</CustomText>
            </View>
          </View>
        </View>
        <View className="px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>Resumo dos itens</CustomText>
          <View className="mt-4">
            {(checkoutItems ?? []).map((checkoutItem, index) => {
              const isSubtotal = checkoutItem.type === ECheckoutItemTypes.SUBTOTAL
              const isTotal = checkoutItem.type === ECheckoutItemTypes.TOTAL

              return (
                <View
                  key={checkoutItem.id}
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
                    {checkoutItem.name}
                  </CustomText>
                  <CustomText
                    variant={isTotal ? ECustomTextVariants.EXPRESSIVE3 : ECustomTextVariants.BODY3}
                    customClassName={cn(
                      'text-right',
                      isTotal ? 'text-neutrals-900' : 'text-neutrals-600',
                    )}
                  >
                    {getDisplayPrice(checkoutItem.price)}
                  </CustomText>
                </View>
              )
            })}
          </View>
        </View>
      </View>
      <View className="px-4 pt-6 pb-1 border-t border-neutrals-200">
        <CustomButton onPress={openPaymentSheet} IconRight={<ArrowRightIcon />}>
          Confirmar pagamento
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
