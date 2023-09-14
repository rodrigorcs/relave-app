import { Autocomplete, CustomText, ECustomTextVariants } from '../components/common'
import { locationActions } from '../core/actions/location'
import { useAsyncData } from '../hooks'
import { useDebounce } from '../hooks/useDebounce'
import { cn } from '../utils/cn'
import { addLeadingZeros } from '../utils/date'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'

interface IDate {
  id: string
  day: number
  relativeDayOfWeek?: string
}

const dates = [
  { id: 'id1', day: 7 },
  { id: 'id2', day: 8 },
  { id: 'id3', day: 9 },
  { id: 'id4', day: 10 },
  { id: 'id5', day: 11 },
  { id: 'id6', day: 12 },
  { id: 'id7', day: 13 },
  { id: 'id8', day: 14 },
  { id: 'id9', day: 15 },
]

export default function Appointment() {
  const [input, setInput] = useState('')
  const [selectedDate, setSelectedDate] = useState<IDate | null>(null)
  const debouncedInput = useDebounce(input, 500)

  const [places] = useAsyncData(
    () => locationActions.getNearbyPlaces(debouncedInput),
    [debouncedInput],
  )

  const options =
    (places ?? []).map((place) => ({
      id: place.place_id as string,
      name: place.name as string,
      address: place.formatted_address as string,
    })) ?? []

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="px-4 py-8 border-b border-neutrals-200">
        <CustomText variant={ECustomTextVariants.HEADING3}>
          Onde devemos realizar o serviço?
        </CustomText>
        <Autocomplete
          title="Digite o seu endereço"
          options={options}
          selectedOption={null}
          onInputChange={setInput}
          filterOnType={false}
          listItemClassName={'flex-col items-start'}
          large
        >
          {(option) => (
            <>
              <CustomText variant={ECustomTextVariants.BODY2}>{option.name}</CustomText>
              <CustomText variant={ECustomTextVariants.HELPER2} customClassName="text-neutrals-500">
                {option.address as string}
              </CustomText>
            </>
          )}
        </Autocomplete>
      </View>
      <View className="py-8">
        <View className="flex-row justify-between items-center px-4">
          <CustomText variant={ECustomTextVariants.HEADING3}>Quando você precisa?</CustomText>
          <CustomText variant={ECustomTextVariants.HEADING6} customClassName="text-brand-500">
            ver mais
          </CustomText>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
          {dates.map((date, index) => {
            const isSelected = date.id === selectedDate?.id
            return (
              <TouchableOpacity
                className={cn(
                  'h-[86] w-[72] bg-neutrals-100 rounded-2xl items-center justify-center',
                  isSelected && 'bg-brand-500',
                  index > 0 && 'ml-2',
                  index === 0 && 'ml-4',
                  index === dates.length - 1 && 'mr-4',
                )}
                onPress={() => setSelectedDate(date)}
              >
                <CustomText
                  variant={ECustomTextVariants.HEADING2}
                  white={isSelected}
                  customClassName="text-center"
                >
                  {addLeadingZeros(date.day, 2)}
                </CustomText>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
