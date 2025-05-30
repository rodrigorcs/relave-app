import { daySchedulesAction } from '../../core/actions/daySchedules'
import { useAsyncData } from '../../hooks'
import { cn } from '../../utils/cn'
import { EDateFormats, dayjs, getTimeId } from '../../utils/dayjs'
import { CustomText, ECustomTextVariants } from '../common'
import { Skeleton } from '../common/Skeleton'
import { IDate } from './DaysRail'
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
  duration: number
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
      id: getTimeId(current),
      formattedTime: current.format(EDateFormats.READABLE_TIME),
      hour: current.hour(),
      minute: current.minute(),
    }
  })
}

const generatePlaceholders = (length: number, numColumns: number): null[] => {
  const placeholdersToAdd = numColumns - (length % numColumns)
  return Array(placeholdersToAdd).fill(null)
}

export const TimesGrid: FC<IProps> = ({ selectedDate, selectedTime, onChange, duration }) => {
  const [availableTimes, isLoadingAvailability] = useAsyncData(
    () => daySchedulesAction.getAvailableTimesByDate(selectedDate.id, duration),
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
              'flex-1 flex-row',
              `items-${position}`,
              position !== 'start' && 'ml-4',
              index > 2 && 'mt-4',
            )}
          >
            {item && (
              <TouchableOpacity
                className={cn(
                  'h-10 flex-1 items-center justify-center rounded-full bg-neutrals-100',
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
