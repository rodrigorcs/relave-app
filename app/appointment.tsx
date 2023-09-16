import { DaysRail, IDate, PlacesAutocomplete } from '../components/appointment'
import { ITime, TimesGrid } from '../components/appointment/TimesGrid'
import { CustomButton, CustomText, ECustomTextVariants } from '../components/common'
import { TGoogleMapsPlaceResult } from '../models/contracts/external/googleMaps'
import { dayjs, dayjsToDate } from '../utils/dayjs'
import { ArrowRight as ArrowRightIcon } from 'iconoir-react-native'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'

export default function Appointment() {
  const [selectedPlace, setSelectedPlace] = useState<TGoogleMapsPlaceResult | null>(null)
  const [selectedDate, setSelectedDate] = useState<IDate>(dayjsToDate(dayjs()))
  const [selectedTime, setSelectedTime] = useState<ITime | null>(null)

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <ScrollView>
        <View className="px-4 py-8 border-b border-neutrals-200 z-10">
          <CustomText variant={ECustomTextVariants.HEADING3}>
            Onde devemos realizar o serviço?
          </CustomText>
          <PlacesAutocomplete selectedPlace={selectedPlace} onChange={setSelectedPlace} />
        </View>
        <View className="flex-col py-8">
          <View className="flex-row justify-between items-center px-4">
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
            />
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pt-6 pb-1 border-t border-neutrals-200">
        <CustomButton onPress={() => {}} IconRight={<ArrowRightIcon />}>
          Continuar
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
