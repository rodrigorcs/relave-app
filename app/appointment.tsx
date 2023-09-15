import { Autocomplete, CustomButton, CustomText, ECustomTextVariants } from '../components/common'
import { locationActions } from '../core/actions/location'
import { useAsyncData } from '../hooks'
import { useDebounce } from '../hooks/useDebounce'
import { Days } from '../models/constants/Days'
import { TGoogleMapsPlaceResult } from '../models/contracts/external/googleMaps'
import { cn } from '../utils/cn'
import { addLeadingZeros } from '../utils/date'
import { dayjs } from '../utils/dayjs'
import { Dayjs } from 'dayjs'
import { ArrowRight as ArrowRightIcon } from 'iconoir-react-native'
import React, { useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'

interface IDate {
  id: string
  day: number
  month: number
  dayOfWeek: string
}

interface ITime {
  formattedTime: string
  hour: number
  minute: number
}

export default function Appointment() {
  const today = dayjs()
  const [input, setInput] = useState('')
  const [selectedAddress, setSelectedAddress] = useState<TGoogleMapsPlaceResult | null>(null)
  const [selectedDate, setSelectedDate] = useState<IDate | null>(null)
  const [selectedTime, setSelectedTime] = useState<ITime | null>(null)
  const debouncedInput = useDebounce(input, 500)

  const getUpcomingDays = (today: Dayjs, daysCount: number): IDate[] => {
    return Array.from({ length: daysCount }, (_element, index) => {
      const date = today.add(index, 'day')

      const day = date.date()
      const month = date.month()
      const dayOfWeek = Days.RELATIVE_DAYS_OF_WEEK[index] ?? Days.DAYS_OF_WEEK[date.day()]

      return {
        id: `${month}-${day}`,
        day,
        month,
        dayOfWeek,
      }
    })
  }

  const getTimesArray = (startTime: number, endTime: number, increment: number): ITime[] => {
    const times = Array.from(
      { length: (endTime - startTime) / increment + 1 },
      (_element, index) => startTime + index * increment,
    )

    return times.map((time) => {
      const current = dayjs()
        .hour(Math.floor(time))
        .minute((time % 1) * 60)
      return {
        formattedTime: current.format('HH:mm'),
        hour: current.hour(),
        minute: current.minute(),
      }
    })
  }

  const generatePlaceholders = (length: number, numColumns: number): null[] => {
    const placeholdersToAdd = numColumns - (length % numColumns)
    return Array(placeholdersToAdd).fill(null)
  }

  const upcomingDays = getUpcomingDays(today, 7)
  const times = getTimesArray(8, 17.5, 0.5)
  const timesWithPlaceholders = [...times, ...generatePlaceholders(times.length, 3)]

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
      <ScrollView>
        <View className="px-4 py-8 border-b border-neutrals-200 z-10">
          <CustomText variant={ECustomTextVariants.HEADING3}>
            Onde devemos realizar o serviço?
          </CustomText>

          <Autocomplete
            title="Digite o seu endereço"
            placeholder="Av. Tancredo Neves, 148"
            options={options}
            selectedOption={selectedAddress}
            setSelectedOption={setSelectedAddress}
            onInputChange={setInput}
            filterOnType={false}
            large
          >
            {(option) => (
              <View className="flex-1 flex-col items-start">
                <CustomText variant={ECustomTextVariants.BODY2}>{option.name}</CustomText>
                <CustomText
                  variant={ECustomTextVariants.HELPER2}
                  customClassName="text-neutrals-500"
                >
                  {option.address as string}
                </CustomText>
              </View>
            )}
          </Autocomplete>
        </View>
        <View className="flex-col py-8">
          <View className="flex-row justify-between items-center px-4">
            <CustomText variant={ECustomTextVariants.HEADING3}>Quando você precisa?</CustomText>
            <CustomText variant={ECustomTextVariants.HEADING6} customClassName="text-brand-500">
              ver mais
            </CustomText>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
            {upcomingDays.map((date, index) => {
              const isSelected = date.id === selectedDate?.id
              return (
                <TouchableOpacity
                  className={cn(
                    'h-[86] w-[72] bg-neutrals-100 rounded-2xl items-center justify-center',
                    isSelected && 'bg-brand-500',
                    index > 0 && 'ml-2',
                    index === 0 && 'ml-4',
                    index === upcomingDays.length - 1 && 'mr-4',
                  )}
                  onPress={() => setSelectedDate(date)}
                  activeOpacity={0.6}
                >
                  <CustomText
                    variant={ECustomTextVariants.BODY4}
                    white={isSelected}
                    customClassName="text-center text-neutrals-500"
                  >
                    {date.dayOfWeek}
                  </CustomText>
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
          <View className="mx-4 mt-6">
            <FlatList
              data={timesWithPlaceholders}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                const isSelected =
                  item?.hour === selectedTime?.hour && item?.minute === selectedTime?.minute

                const positions = ['start', 'center', 'end'] as const
                const position = positions[index % 3]

                return (
                  <View
                    key={item?.formattedTime ?? `placeholder-${position}`}
                    className={cn(
                      'flex-row flex-1',
                      `items-${position}`,
                      position !== 'start' && 'ml-4',
                      index > 2 && 'mt-4',
                    )}
                  >
                    {item && (
                      <TouchableOpacity
                        className={cn(
                          'flex-1 bg-neutrals-100 rounded-full h-10 items-center justify-center',
                          isSelected && 'bg-brand-500',
                        )}
                        onPress={() => setSelectedTime(item)}
                        activeOpacity={0.6}
                      >
                        <CustomText
                          variant={ECustomTextVariants.BODY2}
                          customClassName="text-neutrals-600"
                          white={isSelected}
                        >
                          {item.formattedTime}
                        </CustomText>
                      </TouchableOpacity>
                    )}
                  </View>
                )
              }}
              numColumns={3}
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
