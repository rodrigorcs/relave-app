import { useSkeletonArray } from '../../../hooks'
import { cn } from '../../../utils/cn'
import { Skeleton } from '../../common/Skeleton'
import React, { FC } from 'react'
import { View } from 'react-native'

export const ServiceBundleCardSkeleton: FC = () => {
  const servicesSkeletons = useSkeletonArray(3)

  return (
    <View className={cn('ml-4 w-[272] rounded-2xl bg-neutrals-white')}>
      <View className="flex-row items-center justify-between border-b border-neutrals-200 px-6 py-5">
        <Skeleton customClassName="w-10 h-10 rounded-full" />
        <Skeleton customClassName="w-16 h-8" />
      </View>
      <View className="flex-1 p-6">
        <Skeleton customClassName="w-44 h-6" />
        <View className="mt-4 flex-1">
          {servicesSkeletons.map((randomFactor, index) => {
            const width = 160 * randomFactor
            return (
              <View key={index} className={cn('flex-row items-center', index > 0 && 'mt-3')}>
                <Skeleton customClassName="w-5 h-5 rounded-full" />
                <Skeleton customClassName="h-5 ml-2" style={{ width }} />
              </View>
            )
          })}
        </View>
        <Skeleton customClassName="h-14 w-full rounded-full" />
      </View>
    </View>
  )
}
