import { FC, ReactNode } from 'react'
import React from 'react'
import { Text } from 'react-native'

export enum ECustomTextVariants {
  HEADING1 = 'text-xl font-medium text-neutrals-800',
  SUBTITLE1 = 'text-base font-normal text-neutrals-500',
  SUBTITLE2 = 'text-xs font-normal text-neutrals-500',
  SUBTITLE2_ACTION = 'text-xs underline text-brand-700',
}

interface ICustomTextProps {
  children: ReactNode
  variant: ECustomTextVariants
}

export const CustomText: FC<ICustomTextProps> = ({ children, variant }) => {
  return <Text className={variant}>{children}</Text>
}
