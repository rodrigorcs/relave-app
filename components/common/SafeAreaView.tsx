import { cn } from '../../utils/cn'
import React, { FC, ReactNode } from 'react'
import { Dimensions, StatusBar, SafeAreaView as RNSafeAreaView } from 'react-native'
import { Platform } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  children: ReactNode
  customClassName?: ClassNameValue
}

export const SafeAreaView: FC<IProps> = ({ children, customClassName }) => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24
  const WINDOW_HEIGHT = Dimensions.get('window').height

  const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - (WINDOW_HEIGHT + STATUS_BAR_HEIGHT)

  return (
    <RNSafeAreaView
      className={cn(customClassName)}
      style={{ paddingBottom: Platform.OS === 'android' ? NAVIGATION_BAR_HEIGHT : undefined }}
    >
      {children}
    </RNSafeAreaView>
  )
}
