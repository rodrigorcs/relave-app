import { cn } from '../../utils/cn'
import { isAndroid } from '../../utils/platform'
import React, { FC, ReactNode } from 'react'
import {
  Dimensions,
  StatusBar,
  SafeAreaView as RNSafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  children: ReactNode
  customClassName?: ClassNameValue
  hiddenStatusBar?: boolean
}

export const SafeAreaView: FC<IProps> = ({ children, hiddenStatusBar, customClassName }) => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height
  const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24
  const WINDOW_HEIGHT = Dimensions.get('window').height

  const NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - (WINDOW_HEIGHT + STATUS_BAR_HEIGHT)

  const androidStyle: StyleProp<ViewStyle> = {
    paddingTop: hiddenStatusBar ? STATUS_BAR_HEIGHT : undefined,
    paddingBottom: NAVIGATION_BAR_HEIGHT,
  }

  return (
    <RNSafeAreaView className={cn(customClassName)} style={isAndroid && androidStyle}>
      {children}
    </RNSafeAreaView>
  )
}
