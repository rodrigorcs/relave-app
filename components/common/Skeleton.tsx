import { cn } from '../../utils/cn'
import React, { FC, useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  customClassName: ClassNameValue
}

export const Skeleton: FC<IProps> = ({ customClassName }) => {
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
    <Animated.View
      style={{ opacity: opacity.current }}
      className={cn('bg-neutrals-200 rounded', customClassName)}
    />
  )
}
