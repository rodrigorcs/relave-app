import { cn } from '../../utils/cn'
import { addLeadingZeros } from '../../utils/date'
import { dayjsToDate } from '../../utils/dayjs'
import { dayjs } from '../../utils/dayjs'
import { CustomText, ECustomTextVariants } from '../common'
import { Dayjs } from 'dayjs'
import React, { FC } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

export interface IDate {
  id: string
  day: number
  month: number
  year: number
  dayOfWeek: string
}

interface IProps {
  selectedDate: IDate | null
  onChange: (selectedDate: IDate) => void
}

const getUpcomingDays = (today: Dayjs, daysCount: number): IDate[] => {
  return Array.from({ length: daysCount }, (_element, index) => {
    const date = today.add(index, 'day')

    return dayjsToDate(date)
  })
}

export const DaysRail: FC<IProps> = ({ selectedDate, onChange }) => {
  const today = dayjs()
  const upcomingDays = getUpcomingDays(today, 7)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4 flex-row">
      {upcomingDays.map((date, index) => {
        const isSelected = date.id === selectedDate?.id
        return (
          <TouchableOpacity
            key={date.id}
            className={cn(
              'h-[86] w-[72] items-center justify-center rounded-2xl bg-neutrals-100',
              isSelected && 'bg-brand-500',
              index > 0 && 'ml-2',
              index === 0 && 'ml-4',
              index === upcomingDays.length - 1 && 'mr-4',
            )}
            onPress={() => onChange(date)}
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
  )
}
