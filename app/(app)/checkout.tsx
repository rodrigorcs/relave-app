import { AppointmentCard } from '../../components/checkout'
import {
  CustomButton,
  CustomText,
  ECustomTextVariants,
  SafeAreaView,
} from '../../components/common'
import { PaymentLines } from '../../components/common/PaymentLines'
import { daySchedulesAction } from '../../core/actions/daySchedules'
import { ordersActions } from '../../core/actions/orders'
import { usersActions } from '../../core/actions/users'
import { useCallbackURL, useFirestoreDocument, useStripePaymentSheet } from '../../hooks'
import { EFirestoreCollections } from '../../models/constants/EFirestoreCollections'
import { IUser } from '../../models/contracts/user'
import { IOrderEntity } from '../../models/entities/order'
import { getCurrentUser } from '../../state/slices/auth'
import { getOrder, setIds, setPaymentFromDB } from '../../state/slices/order'
import { IAppState } from '../../state/store'
import { formatPlaceAddress } from '../../utils/address'
import { EDateFormats, dayjs, dayjsToDate } from '../../utils/dayjs'
import { router } from 'expo-router'
import {
  ArrowRight as ArrowRightIcon,
  Calendar as CalendarIcon,
  PinAlt as LocationIcon,
} from 'iconoir-react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function Checkout() {
  const dispatch = useDispatch()
  useCallbackURL()

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  const order = useSelector(({ order }: IAppState) => getOrder(order))
  const { totalPrice, appointment, paymentLines } = order

  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!currentUser?.id) throw new Error('User is not logged in.')

    const execute = async () => {
      const createOrderPromise = ordersActions.createOrder(currentUser.id, order)
      const customerIdPromise = usersActions.getOrCreateStripeCustomer(currentUser as IUser)
      const [createdOrder, customerId] = await Promise.all([createOrderPromise, customerIdPromise])

      dispatch(setIds({ id: createdOrder.id, shortId: createdOrder.shortId }))
      setStripeCustomerId(customerId)
    }

    execute()
  }, [])

  const [openPaymentSheet, isConfiguringStripe, error] = useStripePaymentSheet(
    stripeCustomerId,
    order.id,
    totalPrice,
  )

  const appointmentTime = dayjs.unix(appointment.time ?? 0)
  const { dayOfWeek } = dayjsToDate(appointmentTime)

  const formattedPlaceAddress = formatPlaceAddress(appointment.place)
  const addressLine2 = [
    formattedPlaceAddress.secondaryText,
    appointment.addressDetails ? ` | ${appointment.addressDetails}` : '',
  ].join('')

  const handleConfirmOrder = async () => {
    if (!order.duration) throw new Error('Order duration not specified.')

    setIsLoading(true)
    const timeIsAvailable = await daySchedulesAction.getTimeAvailability(
      appointmentTime,
      order.duration,
    )
    setIsLoading(false)

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
    <SafeAreaView customClassName="flex flex-1 bg-common-background">
      <ScrollView className="flex-1">
        <View className="border-b border-neutrals-200 px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>Informações do pedido</CustomText>
          <View className="mt-4 flex-row">
            <AppointmentCard
              Icon={<LocationIcon />}
              primaryText={formattedPlaceAddress.primaryText}
              secondaryText={addressLine2}
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
            <PaymentLines paymentLines={paymentLines} />
          </View>
        </View>
      </ScrollView>
      <View className="border-t border-neutrals-200 px-4 pb-1 pt-6">
        <CustomButton
          onPress={() => handleConfirmOrder()}
          isDisabled={isLoading || isConfiguringStripe || !!error}
          isLoading={isLoading}
          IconRight={<ArrowRightIcon />}
        >
          Pagar
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
