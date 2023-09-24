import { AppointmentCard } from '../components/checkout'
import { CustomButton, CustomText, ECustomTextVariants } from '../components/common'
import { daySchedulesAction } from '../core/actions/daySchedules'
import { ordersActions } from '../core/actions/orders'
import { usersActions } from '../core/actions/users'
import { useCallbackURL, useFirestoreDocument, useStripePaymentSheet } from '../hooks'
import { EFirestoreCollections } from '../models/constants/EFirestoreCollections'
import { EPaymentLineTypes } from '../models/contracts/order'
import { IUser } from '../models/contracts/user'
import { IOrderEntity } from '../models/entities/order'
import { getCurrentUser } from '../state/slices/auth'
import {
  getAppointment,
  getOrder,
  getPaymentLines,
  getTotalPrice,
  setOrderIds,
  setPaymentFromDB,
} from '../state/slices/order'
import { IAppState } from '../state/store'
import { formatPlaceAddress } from '../utils/address'
import { cn } from '../utils/cn'
import { EDateFormats, dayjs, dayjsToDate } from '../utils/dayjs'
import { getDisplayPrice } from '../utils/price'
import { router } from 'expo-router'
import {
  ArrowRight as ArrowRightIcon,
  Calendar as CalendarIcon,
  PinAlt as LocationIcon,
} from 'iconoir-react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function Checkout() {
  const dispatch = useDispatch()
  useCallbackURL()

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  const appointment = useSelector(({ order }: IAppState) => getAppointment(order))
  const paymentLines = useSelector(({ order }: IAppState) => getPaymentLines(order))
  const totalPrice = useSelector(({ order }: IAppState) => getTotalPrice(order))
  const order = useSelector(({ order }: IAppState) => getOrder(order))

  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser?.id) throw new Error('User is not logged in.')

    const execute = async () => {
      const createOrderPromise = ordersActions.createOrder(currentUser.id, order)
      const customerIdPromise = usersActions.getOrCreateStripeCustomer(currentUser as IUser)
      const [createdOrder, customerId] = await Promise.all([createOrderPromise, customerIdPromise])

      dispatch(setOrderIds({ id: createdOrder.id, shortId: createdOrder.shortId }))
      setStripeCustomerId(customerId)
    }

    execute()
  }, [])

  const [openPaymentSheet, isLoading, error] = useStripePaymentSheet(
    stripeCustomerId,
    order.id,
    totalPrice,
  )

  const appointmentTime = dayjs(appointment.time)
  const { dayOfWeek } = dayjsToDate(appointmentTime)

  const formattedPlaceAddress = formatPlaceAddress(appointment.place)

  const handleConfirmOrder = async () => {
    const timeIsAvailable = await daySchedulesAction.getTimeAvailability(appointmentTime)
    if (!timeIsAvailable) throw new Error('Appointment time is no longer available.')

    openPaymentSheet()
  }

  useFirestoreDocument<IOrderEntity>(EFirestoreCollections.ORDERS, order.id, (orderData) => {
    const paymentIsSucceeded = orderData.payment?.status === 'succeeded'
    if (paymentIsSucceeded) {
      dispatch(setPaymentFromDB(orderData.payment))
      router.push('/orderConfirmation')
    }
    return paymentIsSucceeded // Unsubscribe if succeeded
  })

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1">
        <View className="px-4 py-8 border-b border-neutrals-200">
          <CustomText variant={ECustomTextVariants.HEADING3}>Informações do pedido</CustomText>
          <View className="flex-row mt-4">
            <AppointmentCard
              Icon={<LocationIcon />}
              primaryText={formattedPlaceAddress.primaryText}
              secondaryText={formattedPlaceAddress.secondaryText ?? undefined}
            />
            <AppointmentCard
              Icon={<CalendarIcon />}
              primaryText={dayOfWeek}
              secondaryText={appointmentTime.format(EDateFormats.READABLE_DATE_TIME)}
              marginLeft
            />
          </View>
        </View>
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
      </View>
      <View className="px-4 pt-6 pb-1 border-t border-neutrals-200">
        <CustomButton
          onPress={() => handleConfirmOrder()}
          isDisabled={isLoading || !!error}
          IconRight={<ArrowRightIcon />}
        >
          Confirmar pagamento
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
