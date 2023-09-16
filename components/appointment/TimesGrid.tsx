import { daySchedulesAction } from '../../core/actions/daySchedules'
import { useAsyncData } from '../../hooks'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from '../common'
import { Skeleton } from '../common/Skeleton'
import { IDate } from './DaysRail'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'

export interface ITime {
  id: string
  formattedTime: string
  hour: number
  minute: number
}

interface IProps {
  selectedDate: IDate
  selectedTime: ITime | null
  onChange: (selectedTime: ITime) => void
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
      id: current.format('HH-mm'),
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

export const TimesGrid: FC<IProps> = ({ selectedDate, selectedTime, onChange }) => {
  const [availableTimes, isLoadingAvailability] = useAsyncData(
    () => daySchedulesAction.getByDate(selectedDate.id),
    [selectedDate],
    true,
  )

  const times = getTimesArray(8, 17.5, 0.5)
  const timesWithPlaceholders = [...times, ...generatePlaceholders(times.length, 3)]

  return (
    <FlatList
      data={timesWithPlaceholders}
      scrollEnabled={false}
      renderItem={({ item, index }) => {
        const isDisabled = isLoadingAvailability || !item || !availableTimes?.includes(item?.id)
        const isSelected = !isDisabled && item?.id === selectedTime?.id

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
                onPress={() => onChange(item)}
                disabled={isDisabled}
                activeOpacity={isDisabled ? 1 : 0.6}
              >
                {isLoadingAvailability ? (
                  <Skeleton customClassName="w-12 h-5" />
                ) : (
                  <CustomText
                    variant={ECustomTextVariants.BODY2}
                    customClassName={cn(isDisabled ? 'text-neutrals-300' : 'text-neutrals-600')}
                    white={isSelected}
                  >
                    {item.formattedTime}
                  </CustomText>
                )}
              </TouchableOpacity>
            )}
          </View>
        )
      }}
      numColumns={3}
    />
  )
}
