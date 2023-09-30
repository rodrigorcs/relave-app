import { cn } from '../../utils/cn'
import React, { FC, useRef, useEffect } from 'react'
import { Animated } from 'react-native'

interface IProps {
  index: number
  page: number
}

export const PageMarker: FC<IProps> = ({ index, page }) => {
  const animationValue = useRef(new Animated.Value(page === index ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: page === index ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [page])

  const width = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 32],
  })

  return (
    <Animated.View
      className={cn(
        'h-2 rounded-full bg-neutrals-200',
        index > 0 && 'ml-1',
        index === page && 'bg-brand-500',
      )}
      style={{ width }}
    />
  )
}
