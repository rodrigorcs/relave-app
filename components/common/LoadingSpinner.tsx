import { cn } from '../../utils/cn'
import React, { FC, memo } from 'react'
import { ActivityIndicator, ColorValue } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  color: ColorValue
  size?: number | 'small' | 'large'
  customClassName?: ClassNameValue
}

export const LoadingSpinner: FC<IProps> = memo(({ size = 'small', color, customClassName }) => {
  return <ActivityIndicator size={size} color={color} className={cn(customClassName)} />
})
