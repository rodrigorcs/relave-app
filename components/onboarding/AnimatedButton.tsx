import { CustomButton, ECustomButtonVariants } from '../common'
import { NavArrowRight as ChevronRightIcon } from 'iconoir-react-native'
import React, { FC, useRef, useEffect } from 'react'
import { Animated } from 'react-native'

interface IProps {
  isLastPage: boolean
  onNext: () => void
  onFinish: () => void
}

export const AnimatedButton: FC<IProps> = ({ isLastPage, onNext, onFinish }) => {
  const animationValue = useRef(new Animated.Value(isLastPage ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isLastPage ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isLastPage])

  const width = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [72, 200],
  })

  return (
    <Animated.View style={{ width }}>
      <CustomButton
        variant={isLastPage ? ECustomButtonVariants.PRIMARY : ECustomButtonVariants.ICON}
        onPress={isLastPage ? onFinish : onNext}
        IconRight={isLastPage && <ChevronRightIcon />}
        customClassName="w-full"
        textStyle={{ flexWrap: 'nowrap' }}
      >
        {isLastPage ? 'Comece agora' : <ChevronRightIcon />}
      </CustomButton>
    </Animated.View>
  )
}
