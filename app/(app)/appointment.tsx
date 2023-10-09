import { DaysRail, IDate, PlacesAutocomplete } from '../../components/appointment'
import { ITime, TimesGrid } from '../../components/appointment/TimesGrid'
import {
  CustomButton,
  CustomText,
  ECustomTextVariants,
  SafeAreaView,
} from '../../components/common'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps'
import { getCart } from '../../state/slices/cart'
import { setAppointment, setItemsFromCart } from '../../state/slices/order'
import { IAppState } from '../../state/store'
import { dayjs, dayjsToDate } from '../../utils/dayjs'
import { router } from 'expo-router'
import { ArrowRight as ArrowRightIcon } from 'iconoir-react-native'
import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function Appointment() {
  const dispatch = useDispatch()
  const cart = useSelector(({ cart }: IAppState) => getCart(cart))

  const [selectedPlace, setSelectedPlace] = useState<TGoogleMapsPlaceResult | null>(null)
  const [selectedDate, setSelectedDate] = useState<IDate>(dayjsToDate(dayjs()))
  const [selectedTime, setSelectedTime] = useState<ITime | null>(null)

  const onSubmit = () => {
    if (!selectedTime) return
    const { year, month, day } = selectedDate
    const { hour, minute } = selectedTime
    const datetime = `${year}-${month}-${day} ${hour}:${minute}`
    dispatch(setAppointment({ place: selectedPlace, time: dayjs(datetime).unix() }))
    dispatch(setItemsFromCart(cart))

    router.push('/checkout')
  }

  return (
    <SafeAreaView customClassName="flex flex-1 bg-common-background">
      <ScrollView>
        <View className="z-10 border-b border-neutrals-200 px-4 py-8">
          <CustomText variant={ECustomTextVariants.HEADING3}>
            Onde devemos realizar o serviço?
          </CustomText>
          <PlacesAutocomplete selectedPlace={selectedPlace} onChange={setSelectedPlace} />
        </View>
        <View className="flex-col py-8">
          <View className="flex-row items-center justify-between px-4">
            <CustomText variant={ECustomTextVariants.HEADING3}>Quando você precisa?</CustomText>
            <CustomText variant={ECustomTextVariants.HEADING6} customClassName="text-brand-500">
              ver mais
            </CustomText>
          </View>
          <DaysRail selectedDate={selectedDate} onChange={setSelectedDate} />
          <View className="mx-4 mt-6">
            <TimesGrid
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onChange={setSelectedTime}
              duration={cart.duration ?? 0}
            />
          </View>
        </View>
      </ScrollView>
      <View className="border-t border-neutrals-200 px-4 pb-1 pt-6">
        <CustomButton
          onPress={onSubmit}
          isDisabled={!selectedPlace || !selectedTime}
          IconRight={<ArrowRightIcon />}
        >
          Continuar
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
