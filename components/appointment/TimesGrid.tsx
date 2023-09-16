import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from '../common'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'

export interface ITime {
  formattedTime: string
  hour: number
  minute: number
}

interface IProps {
  selectedTime: ITime | null
  onChange: (selectedTime: ITime) => void
}

export const TimesGrid: FC<IProps> = ({ selectedTime, onChange }) => {
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

  const times = getTimesArray(8, 17.5, 0.5)
  const timesWithPlaceholders = [...times, ...generatePlaceholders(times.length, 3)]

  return (
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
                onPress={() => onChange(item)}
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
  )
}
