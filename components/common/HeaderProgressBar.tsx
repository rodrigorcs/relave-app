import React, { FC } from 'react'
import { DimensionValue, View } from 'react-native'

interface IProps {
  progress: number
}

export const HeaderProgressBar: FC<IProps> = ({ progress }) => {
  const width: DimensionValue = `${progress * 100}%`

  return (
    <View className="w-full bg-common-background h-[2]">
      <View className="bg-brand-500 h-full" style={{ width }}></View>
    </View>
  )
}
