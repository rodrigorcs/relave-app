import { cn } from '../../utils/cn'
import { FC, ReactNode } from 'react'
import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

export enum ECustomTextVariants {
  HEADING1 = 'text-4xl font-[InterSemiBold] text-neutrals-800',
  HEADING2 = 'text-3xl font-[InterSemiBold] text-neutrals-800',
  HEADING3 = 'text-2xl font-[InterSemiBold] text-neutrals-800',
  HEADING4 = 'text-xl font-[InterSemiBold] text-neutrals-800',
  HEADING5 = 'text-base font-[InterSemiBold] text-neutrals-800',
  HEADING6 = 'text-sm font-[InterSemiBold] text-neutrals-800',

  SUBHEADING1 = 'text-xl font-[InterMedium] text-neutrals-800',
  SUBHEADING2 = 'text-base font-[InterMedium] text-neutrals-800',
  SUBHEADING3 = 'text-sm font-[InterMedium] text-neutrals-800',

  BODY1 = 'text-xl font-[DMSansRegular] text-neutrals-800',
  BODY2 = 'text-base font-[DMSansRegular] text-neutrals-800',
  BODY3 = 'text-sm font-[DMSansRegular] text-neutrals-800',
  BODY4 = 'text-xs font-[DMSansMedium] text-neutrals-800',

  EXPRESSIVE1 = 'text-xl font-[DMSansBold] text-neutrals-800',
  EXPRESSIVE2 = 'text-base font-[DMSansBold] text-neutrals-800',
  EXPRESSIVE3 = 'text-sm font-[DMSansBold] text-neutrals-800',

  EYEBROW1 = 'text-sm font-[InterBold] uppercase text-neutrals-800',
  EYEBROW2 = 'text-xs font-[InterBold] uppercase text-neutrals-800',

  HELPER1 = 'text-sm font-[DMSansRegular] text-neutrals-800 ',
  HELPER2 = 'text-xs font-[DMSansRegular] text-neutrals-800',
}

interface ICustomTextProps {
  children: ReactNode
  variant: ECustomTextVariants
  customClassName?: ClassNameValue
  white?: boolean
  numberOfLines?: number
  style?: StyleProp<TextStyle>
}

export const CustomText: FC<ICustomTextProps> = ({
  children,
  variant,
  customClassName,
  white,
  numberOfLines,
  style,
}) => {
  return (
    <Text
      className={cn(variant, customClassName, white && 'text-neutrals-white')}
      numberOfLines={numberOfLines}
      style={style}
    >
      {children}
    </Text>
  )
}
