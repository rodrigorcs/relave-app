import { cn } from '../../utils/cn'
import { FC, ReactNode } from 'react'
import React from 'react'
import { Text } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

export enum ECustomTextVariants {
  HEADING1 = 'text-4xl font-semibold text-neutrals-800',
  HEADING2 = 'text-3xl font-semibold text-neutrals-800',
  HEADING3 = 'text-2xl font-semibold text-neutrals-800',
  HEADING4 = 'text-xl font-semibold text-neutrals-800',
  HEADING5 = 'text-base font-semibold text-neutrals-800',
  HEADING6 = 'text-sm font-semibold text-neutrals-800',

  SUBHEADING1 = 'text-xl font-medium text-neutrals-800',
  SUBHEADING2 = 'text-base font-medium text-neutrals-800',
  SUBHEADING3 = 'text-sm font-medium text-neutrals-800',

  BODY1 = 'text-xl font-normal text-neutrals-800',
  BODY2 = 'text-base font-normal text-neutrals-800',
  BODY3 = 'text-sm font-normal text-neutrals-800',
  BODY4 = 'text-xs font-medium text-neutrals-800',

  EXPRESSIVE1 = 'text-xl font-bold text-neutrals-800',
  EXPRESSIVE2 = 'text-base font-bold text-neutrals-800',
  EXPRESSIVE3 = 'text-sm font-bold text-neutrals-800',

  EYEBROW1 = 'text-sm font-bold uppercase text-neutrals-800',
  EYEBROW2 = 'text-xs font-bold uppercase text-neutrals-800',

  HELPER1 = 'text-sm font-normal text-neutrals-800 ',
  HELPER2 = 'text-xs font-normal text-neutrals-800',
}

interface ICustomTextProps {
  children: ReactNode
  variant: ECustomTextVariants
  customClassName?: ClassNameValue
}

export const CustomText: FC<ICustomTextProps> = ({ children, variant, customClassName }) => {
  return <Text className={cn(variant, customClassName)}>{children}</Text>
}
