import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { IconoirProvider } from 'iconoir-react-native'
import React, { FC, ReactNode } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

export enum ECustomButtonVariants {
  PRIMARY = 'h-14 bg-brand-500',
  SECONDARY = 'h-14 border border-brand-500',
  TERTIARY = 'h-8',
}

enum ECustomButtonTextVariants {
  PRIMARY = 'text-neutrals-white',
  SECONDARY = 'text-brand-500',
  TERTIARY = 'text-brand-500 ',
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
        'flex-row items-center justify-center rounded-full',
        variant,
        isDisabled && 'bg-brand-300',
        customClassName,
      )}
      onPress={onPress}
      activeOpacity={isDisabled ? 1 : 0.2}
    >
      <IconoirProvider
        iconProps={{
          width: 24,
          height: 24,
          strokeWidth: 2,
          color:
            variant === ECustomButtonVariants.TERTIARY
              ? theme.colors['brand-500']
              : theme.colors['neutrals-white'],
        }}
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
      </IconoirProvider>
    </TouchableOpacity>
  )
}
