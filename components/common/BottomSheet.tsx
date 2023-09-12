import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { Cancel as CloseIcon } from 'iconoir-react-native'
import React, { useCallback, useEffect, useImperativeHandle } from 'react'
import { Pressable, TouchableOpacity } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

interface IBottomSheetProps {
  children?: React.ReactNode
  height: number
  isOpen: boolean
  close: () => void
}

export interface IBottomSheetRefProps {
  scrollTo: (destination: number) => void
  isActive: () => boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const BottomSheet = React.forwardRef<IBottomSheetRefProps, IBottomSheetProps>(
  ({ children, height, isOpen, close }, ref) => {
    const MAX_TRANSLATE_Y = height + 60
    const translateY = useSharedValue(MAX_TRANSLATE_Y)
    const active = useSharedValue(true)

    useEffect(() => {
      isOpen ? scrollTo(0) : scrollTo(MAX_TRANSLATE_Y)
    }, [isOpen])

    const scrollTo = useCallback((destination: number) => {
      'worklet'
      active.value = destination === 0
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
        translateY.value = Math.max(translateY.value, 0)
      })
      .onEnd(() => {
        if (translateY.value > MAX_TRANSLATE_Y / 3) {
          scrollTo(MAX_TRANSLATE_Y)
        } else if (translateY.value < MAX_TRANSLATE_Y / 1.5) {
          runOnJS(close)()
        }
      })

    const rBottomSheetStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }))

    const rOverlayStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y, 0],
        [0, 0.5],
        Extrapolate.CLAMP,
      )

      return { opacity }
    })

    return (
      <>
        <AnimatedPressable
          className="absolute top-0 left-0 right-0 bottom-0 bg-neutrals-black opacity-0"
          style={rOverlayStyle}
          pointerEvents={isOpen ? 'auto' : 'none'}
          onPress={() => close()}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View
            className={cn(
              'w-full bg-neutrals-white absolute rounded-t-3xl px-6 pt-14 pb-8 bottom-0',
            )}
            style={[rBottomSheetStyle, { height }]}
          >
            <TouchableOpacity
              className="absolute top-6 right-6 w-6 h-6 rounded-full items-center justify-center bg-neutrals-100"
              onPress={() => close()}
            >
              <CloseIcon
                width={16}
                height={16}
                strokeWidth={2}
                color={theme.colors['neutrals-800']}
              />
            </TouchableOpacity>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    )
  },
)
