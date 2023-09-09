import React, { useCallback, useImperativeHandle } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50

type BottomSheetProps = {
  children?: React.ReactNode
}

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void
  isActive: () => boolean
}

export const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children }, ref) => {
    const translateY = useSharedValue(0)
    const active = useSharedValue(false)

    const scrollTo = useCallback((destination: number) => {
      'worklet'
      active.value = destination !== 0
      translateY.value = withSpring(destination, { damping: 50 })
    }, [])

    const isActive = useCallback(() => {
      return active.value
    }, [])

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive])

    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value }
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y)
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          scrollTo(0)
        } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y)
        }
      })

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      )

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      }
    })

    const rOverlayStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateY.value,
        [0, MAX_TRANSLATE_Y],
        [0, 0.7],
        Extrapolate.CLAMP,
      )

      return { opacity }
    })

    return (
      <>
        <Animated.View
          className="absolute top-0 left-0 right-0 bottom-0 bg-neutrals-black opacity-0"
          style={rOverlayStyle}
          pointerEvents="none"
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            className="w-full bg-neutrals-white absolute rounded-3xl p-6 pt-14"
            style={[styles.bottomSheetContainer, rBottomSheetStyle]}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    )
  },
)

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    top: SCREEN_HEIGHT,
  },
})
