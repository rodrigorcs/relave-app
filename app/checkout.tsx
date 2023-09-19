import { CustomButton, CustomText, ECustomTextVariants } from '../components/common'
import { useStripePaymentSheet } from '../hooks'
import { IService } from '../models/contracts/service'
import { IServiceBundle, IServiceBundleWithDetails } from '../models/contracts/serviceBundle'
import { getCurrentUser } from '../state/slices/auth'
import { getAdditionalServices, getAppointment, getServiceBundle } from '../state/slices/order'
import { IAppState } from '../state/store'
import { theme } from '../theme'
import { cn } from '../utils/cn'
import { dayjs } from '../utils/dayjs'
import { getDisplayPrice } from '../utils/price'
import {
  ArrowRight as ArrowRightIcon,
  Calendar as CalendarIcon,
  PinAlt as LocationIcon,
} from 'iconoir-react-native'
import React from 'react'
import { SafeAreaView, View } from 'react-native'
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
  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  const appointment = useSelector(({ order }: IAppState) => getAppointment(order))
  const serviceBundle = useSelector(({ order }: IAppState) => getServiceBundle(order))
  const additionalServices = useSelector(({ order }: IAppState) => getAdditionalServices(order))

  const checkoutItems = serviceBundle && cartToCheckoutItems({ serviceBundle, additionalServices })
  const totalAmount = (checkoutItems ?? []).find(
    (checkoutItem) => checkoutItem.type === ECheckoutItemTypes.TOTAL,
  )?.price

  const [openPaymentSheet, isLoading, error] = useStripePaymentSheet(
    totalAmount,
    currentUser?.stripeId,
  )

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1">
        <View className="px-4 py-8 border-b border-neutrals-200">
          <CustomText variant={ECustomTextVariants.HEADING3}>Informações do pedido</CustomText>
          <View className="flex-row mt-4">
            <View className="flex-1 h-32 p-4 justify-between rounded-2xl border border-neutrals-200">
              <LocationIcon width={20} height={20} color={theme.colors['neutrals-800']} />
              <CustomText variant={ECustomTextVariants.BODY3}>{appointment.place?.name}</CustomText>
            </View>
            <View className="flex-1 h-32 p-4 justify-between rounded-2xl border border-neutrals-200 ml-4">
              <CalendarIcon width={20} height={20} color={theme.colors['neutrals-800']} />
              <CustomText variant={ECustomTextVariants.BODY3}>
                {dayjs(appointment.time).format('DD [de] MMMM [às] HH:mm')}
              </CustomText>
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
        <CustomButton
          onPress={() => openPaymentSheet()}
          isDisabled={isLoading || !!error}
          IconRight={<ArrowRightIcon />}
        >
          Confirmar pagamento
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
