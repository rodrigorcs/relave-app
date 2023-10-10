import { SafeAreaView, CustomText, ECustomTextVariants, CloudImage } from '../../components/common'
import {
  AnimatedButton,
  PageMarker,
  SyncedScrollView,
  SyncedScrollViewContext,
  syncedScrollViewState,
} from '../../components/onboarding'
import { onboardingHintsActions } from '../../core/actions/onboardingHints'
import { useAsyncData, useCloudImage } from '../../hooks'
import { Endpoints } from '../../models/constants/Endpoints'
import { cn } from '../../utils/cn'
import { isAndroid } from '../../utils/platform'
import { router } from 'expo-router'
import React, { FC, useContext, useRef, useState } from 'react'
import { View, Dimensions, ScrollView } from 'react-native'

interface IProps {
  hintSlug: string
  imageWidth: number
  isLastImage: boolean
}

export const OnboardingHintImage: FC<IProps> = ({ hintSlug, imageWidth, isLastImage }) => {
  const [imageUrl, hasImageError] = useCloudImage(Endpoints.ONBOARDING_HINTS_IMAGES(hintSlug))

  return (
    <CloudImage
      imageUrl={imageUrl}
      hasImageUrlError={!!hasImageError}
      width={imageWidth}
      customClassName={cn('flex-1 rounded-2xl ml-4', isLastImage && 'mr-4')}
    />
  )
}

export default function Onboarding() {
  const { width: screenWidth } = Dimensions.get('window')
  const imageWidth = screenWidth * 0.91 - 32

  const [page, setPage] = useState(0)
  const offsetPercentRef = useRef(0)
  const detailsScrollViewRef = useRef<ScrollView>(null)

  const { offsetPercent } = useContext(SyncedScrollViewContext)
  offsetPercent.addListener(({ value }) => {
    offsetPercentRef.current = value
  })

  const [fetchedHints] = useAsyncData(() => onboardingHintsActions.getAll())
  const hints = (fetchedHints ?? []).sort((a, b) => (a.order > b.order ? 1 : -1))

  const onPageChange = () => {
    const currentPage = offsetPercentRef.current * (hints.length - 1)
    setPage(Math.round(currentPage))
  }

  const handleGoToNextHint = () => {
    detailsScrollViewRef.current?.scrollTo({ x: screenWidth * (page + 1), animated: true })
    if (isAndroid) setPage(page + 1)
  }

  const handleGoToSignIn = () => {
    router.push('/phoneNumber')
  }

  return (
    <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      <SafeAreaView hiddenStatusBar customClassName="flex-1 bg-common-background">
        <View className="flex-1 pb-2 pt-6">
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
              {hints.map((hint, index) => (
                <OnboardingHintImage
                  key={hint.id}
                  hintSlug={hint.slug}
                  imageWidth={imageWidth}
                  isLastImage={index === hints.length - 1}
                />
              ))}
            </SyncedScrollView>
          </View>
          <View>
            <SyncedScrollView
              id={0}
              ref={detailsScrollViewRef}
              onMomentumScrollEnd={onPageChange}
              horizontal
              pagingEnabled
              decelerationRate={0}
              snapToInterval={screenWidth}
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
            >
              {hints.map((hint) => (
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
          <View className="mt-4 flex-row items-center justify-between px-8">
            <View className="flex-row">
              {hints.map((_hint, index) => (
                <PageMarker key={index} index={index} page={page} />
              ))}
            </View>
            <AnimatedButton
              isLastPage={page === hints.length - 1}
              onNext={handleGoToNextHint}
              onFinish={handleGoToSignIn}
            />
          </View>
        </View>
      </SafeAreaView>
    </SyncedScrollViewContext.Provider>
  )
}
