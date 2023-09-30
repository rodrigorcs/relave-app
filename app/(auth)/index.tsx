import {
  CustomButton,
  CustomText,
  ECustomButtonVariants,
  ECustomTextVariants,
} from '../../components/common'
import { SyncedScrollView } from '../../components/onboarding/SyncedScrollView'
import {
  SyncedScrollViewContext,
  syncedScrollViewState,
} from '../../components/onboarding/SyncedScrollViewContext'
import { cn } from '../../utils/cn'
import { NavArrowRight as ChevronRightIcon } from 'iconoir-react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  View,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
} from 'react-native'

const HINTS = [
  {
    imageUrl:
      'https://images.theconversation.com/files/76578/original/image-20150331-1231-1ttwii6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    title: 'Lorem ipsum dolor sit amet consectetur',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Ut ultrices nec sed nibh purus adipiscing ut.',
  },
  {
    imageUrl:
      'https://images.theconversation.com/files/76578/original/image-20150331-1231-1ttwii6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    title: 'Lorem ipsum dolor sit amet',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Ut ultrices nec sed nibh purus adipiscing ut.',
  },
  {
    imageUrl:
      'https://images.theconversation.com/files/76578/original/image-20150331-1231-1ttwii6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    title: 'Lorem ipsum dolor sit',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Ut ultrices nec sed nibh purus adipiscing ut.',
  },
] as const

interface IProps {
  index: number
  page: number
}

const PageMarker: FC<IProps> = ({ index, page }) => {
  const animationValue = useRef(new Animated.Value(page === index ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: page === index ? 1 : 0,
      duration: 300,
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

export default function Onboarding() {
  const { width: screenWidth } = Dimensions.get('window')
  const imageWidth = screenWidth * 0.91 - 16
  const [page, setPage] = useState(0)

  const handleGoToNextHint = () => {
    setPage(page + 1)
  }

  const onPageChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x: scrollOffset } = event.nativeEvent.contentOffset
    const currentPage = scrollOffset / screenWidth
    setPage(currentPage)
  }

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      <SafeAreaView className="flex-1 bg-common-background">
        <View className="flex-1 pt-6 pb-2">
          <View className="flex-1">
            <SyncedScrollView
              id={1}
              horizontal
              pagingEnabled
              decelerationRate={0}
              snapToInterval={screenWidth}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
            >
              {HINTS.map((hint, index) => (
                <Image
                  key={hint.title}
                  source={{
                    uri: hint.imageUrl,
                  }}
                  className={cn('rounded-2xl ml-4', index === 2 && 'mr-4')}
                  style={{ width: imageWidth }}
                />
              ))}
            </SyncedScrollView>
          </View>
          <View>
            <SyncedScrollView
              id={2}
              onMomentumScrollEnd={onPageChange}
              horizontal
              pagingEnabled
              decelerationRate={0}
              snapToInterval={screenWidth}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
            >
              {HINTS.map((hint) => (
                <View
                  key={hint.title}
                  style={{ width: screenWidth, paddingHorizontal: 16 }}
                  className="mt-6"
                >
                  <CustomText variant={ECustomTextVariants.HEADING2}>{hint.title}</CustomText>
                  <CustomText
                    variant={ECustomTextVariants.BODY3}
                    customClassName="text-neutrals-600 mt-4"
                  >
                    {hint.subtitle}
                  </CustomText>
                </View>
              ))}
            </SyncedScrollView>
          </View>
          <View className="flex-row mt-4 px-8 items-center justify-between">
            <View className="flex-row">
              {HINTS.map((_hint, index) => (
                <PageMarker key={index} index={index} page={page} />
              ))}
            </View>
            <CustomButton variant={ECustomButtonVariants.ICON} onPress={handleGoToNextHint}>
              <ChevronRightIcon />
            </CustomButton>
          </View>
        </View>
      </SafeAreaView>
    </SyncedScrollViewContext.Provider>
  )
}
