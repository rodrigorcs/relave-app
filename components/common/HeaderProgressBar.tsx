import React, { FC } from 'react'
import { DimensionValue, View } from 'react-native'

interface IProps {
  progress: number
}

export const HeaderProgressBar: FC<IProps> = ({ progress }) => {
  const width: DimensionValue = `${progress * 100}%`

  return (
    <View className="h-[2] w-full bg-common-background">
      <View className="h-full bg-brand-500" style={{ width }}></View>
    </View>
  )
}
