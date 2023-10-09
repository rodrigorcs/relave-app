import { cn } from '../../utils/cn'
import React, { FC, useRef, useEffect, ReactNode } from 'react'
import { Animated, StyleProp, View, ViewStyle } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  customClassName: ClassNameValue
  style?: StyleProp<ViewStyle>
  isLoaded?: boolean
  children?: ReactNode
}

export const Skeleton: FC<IProps> = ({ customClassName, style, isLoaded, children }) => {
  const opacity = useRef(new Animated.Value(0.3))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start()
  }, [opacity])

  return (
    <View>
      {!isLoaded && (
        <Animated.View
          style={{ opacity: opacity.current, ...(style as Record<string, unknown>) }}
          className={cn('rounded bg-neutrals-200', customClassName)}
        />
      )}
      {children}
    </View>
  )
}
