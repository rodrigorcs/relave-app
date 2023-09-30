import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from './CustomText'
import { IconoirProvider } from 'iconoir-react-native'
import React, { FC, ReactNode } from 'react'
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

export enum ECustomButtonVariants {
  PRIMARY = 'h-14 px-6 bg-brand-500',
  SECONDARY = 'h-14 border border-brand-500',
  TERTIARY = 'h-8',
  ICON = 'h-14 px-6 bg-brand-500 ',
}

interface IProps {
  onPress: () => void
  children: ReactNode
  variant?: ECustomButtonVariants
  isDisabled?: boolean
  customClassName?: ClassNameValue
  IconLeft?: ReactNode
  IconRight?: ReactNode
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const CustomButton: FC<IProps> = ({
  onPress,
  children,
  variant = ECustomButtonVariants.PRIMARY,
  isDisabled,
  customClassName,
  IconLeft,
  IconRight,
  style,
  textStyle,
}) => {
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
      style={style}
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
        {variant === ECustomButtonVariants.ICON ? (
          children
        ) : (
          <>
            {IconLeft && IconLeft}
            <CustomText
              variant={ECustomTextVariants.HEADING5}
              customClassName={cn(
                IconLeft && 'ml-4',
                IconRight && 'mr-4',
                variant === ECustomButtonVariants.PRIMARY
                  ? 'text-neutrals-white'
                  : 'text-brand-500',
              )}
              style={textStyle}
              numberOfLines={1}
            >
              {children}
            </CustomText>
            {IconRight && IconRight}
          </>
        )}
      </IconoirProvider>
    </TouchableOpacity>
  )
}
