import { cn } from '../../../utils/cn'
import { Skeleton } from '../../common/Skeleton'
import React, { FC } from 'react'
import { View } from 'react-native'

interface IProps {
  index: number
}

export const UserVehicleCardSkeleton: FC<IProps> = ({ index }) => {
  return (
    <View key={index} className={cn(index > 0 && 'ml-2', index === 0 && 'ml-4')}>
      <View
        className={cn('h-32 w-32 mb-2 bg-neutrals-100 rounded-2xl items-center justify-center')}
      >
        <Skeleton customClassName="w-8 aspect-square" />
        <Skeleton customClassName="w-20 h-4 mt-4" />
        <Skeleton customClassName="w-16 h-4 mt-1" />
      </View>
    </View>
  )
}
