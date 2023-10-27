import { DaysRail, IDate, PlacesAutocomplete } from '../../components/appointment'
import { ITime, TimesGrid } from '../../components/appointment/TimesGrid'
import {
  CustomButton,
  CustomInput,
  CustomText,
  ECustomTextVariants,
  SafeAreaView,
} from '../../components/common'
import { useDeviceLocation, useKeyboardVisibility } from '../../hooks'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps'
import { getCurrentUser } from '../../state/slices/auth'
import { getCart } from '../../state/slices/cart'
import { setAppointment, setItemsFromCart } from '../../state/slices/order'
import { IAppState } from '../../state/store'
import { cn } from '../../utils/cn'
import { dayjs, dayjsToDate } from '../../utils/dayjs'
import { isAndroid, isIOS } from '../../utils/platform'
import { router } from 'expo-router'
import { ArrowRight as ArrowRightIcon } from 'iconoir-react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function Appointment() {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  const cart = useSelector(({ cart }: IAppState) => getCart(cart))

  const location = useDeviceLocation()
  const isKeyboardOpen = useKeyboardVisibility()

  const [selectedPlace, setSelectedPlace] = useState<TGoogleMapsPlaceResult | null>(null)
  const [selectedDate, setSelectedDate] = useState<IDate>(dayjsToDate(dayjs()))
  const [selectedTime, setSelectedTime] = useState<ITime | null>(null)
  const [addressDetails, setAddressDetails] = useState('')

  const handleAddressDetailsChange = (newValue: string) => {
    setAddressDetails(newValue)
  }

  const onSubmit = () => {
    if (!selectedTime) return
    const { year, month, day } = selectedDate
    const { hour, minute } = selectedTime
    const datetime = `${year}-${month}-${day} ${hour}:${minute}`
    dispatch(setAppointment({ place: selectedPlace, time: dayjs(datetime).unix(), addressDetails }))
    dispatch(setItemsFromCart(cart))

    router.push('/checkout')
  }

  useEffect(() => {
    if (currentUser?.lastAddress) setSelectedPlace(currentUser?.lastAddress)
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={96}
      className="flex-1"
    >
      <SafeAreaView customClassName="flex flex-1 bg-common-background">
        <ScrollView keyboardShouldPersistTaps="handled">
          <View className="z-10 border-b border-neutrals-200 px-4 py-8">
            <CustomText variant={ECustomTextVariants.HEADING3}>
              Onde devemos realizar o serviço?
            </CustomText>
            <PlacesAutocomplete
              selectedPlace={selectedPlace}
              defaultPlace={currentUser?.lastAddress}
              onChange={setSelectedPlace}
              location={location}
            />
            <CustomInput
              title="Complemento"
              placeholder="Ap. 602, Torre C..."
              value={addressDetails}
              handleValueChange={handleAddressDetailsChange}
              customClassName="mt-2"
            />
          </View>
          <View className="flex-col py-8">
            <View className="flex-row items-center justify-between px-4">
              <CustomText variant={ECustomTextVariants.HEADING3}>Quando você precisa?</CustomText>
              {false && (
                <CustomText variant={ECustomTextVariants.HEADING6} customClassName="text-brand-500">
                  ver mais
                </CustomText>
              )}
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
        <View
          className={cn(
            'border-t border-neutrals-200 px-4 pb-2 pt-6',
            isKeyboardOpen && 'pb-4 pt-4',
            isAndroid && 'pb-0',
          )}
        >
          <CustomButton
            onPress={onSubmit}
            isDisabled={!selectedPlace || !selectedTime}
            IconRight={<ArrowRightIcon />}
          >
            Continuar
          </CustomButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
