import { cn } from '../../utils/cn'
import React, { FC, ReactNode } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

export enum ECustomButtonVariants {
  PRIMARY = 'bg-brand-500',
  SECONDARY = 'border border-brand-500',
}

enum ECustomButtonTextVariants {
  PRIMARY = 'text-neutrals-white',
  SECONDARY = 'text-brand-500',
}

interface IProps {
  onPress: () => void
  children: ReactNode
  variant?: ECustomButtonVariants
  isDisabled?: boolean
  customClassName?: ClassNameValue
  IconLeft?: ReactNode
  IconRight?: ReactNode
}

export const CustomButton: FC<IProps> = ({
  onPress,
  children,
  variant = ECustomButtonVariants.PRIMARY,
  isDisabled,
  customClassName,
  IconLeft,
  IconRight,
}) => {
  const variantKey = Object.entries(ECustomButtonVariants).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_key, value]) => value === variant,
  )?.[0]

  return (
    <TouchableOpacity
      className={cn(
        'h-14 flex-row items-center justify-center rounded-full',
        variant,
        isDisabled && 'bg-brand-300',
        customClassName,
      )}
      onPress={onPress}
      activeOpacity={isDisabled ? 1 : 0.2}
    >
      {IconLeft && IconLeft}
      <Text
        className={cn(
          'text-base font-semibold text-neutrals-white',
          IconLeft && 'ml-4',
          IconRight && 'mr-4',
          ECustomButtonTextVariants[variantKey as keyof typeof ECustomButtonVariants],
        )}
      >
        {children}
      </Text>
      {IconRight && IconRight}
    </TouchableOpacity>
  )
}
