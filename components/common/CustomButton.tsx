import { cn } from '../../utils/cn'
import React, { FC, ReactNode } from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface IProps {
  isDisabled: boolean
  onPress: () => void
  children: ReactNode
}

export const CustomButton: FC<IProps> = ({ isDisabled, onPress, children }) => {
  return (
    <TouchableOpacity
      className={cn(
        'mt-6 h-12 items-center justify-center rounded bg-brand-500',
        isDisabled && 'bg-brand-300',
      )}
      onPress={onPress}
      activeOpacity={isDisabled ? 1 : 0.2}
    >
      <Text className="text-base font-semibold text-neutrals-white">{children}</Text>
    </TouchableOpacity>
  )
}
