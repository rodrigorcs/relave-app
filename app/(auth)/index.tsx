import { CustomText, ECustomTextVariants } from '../../components/common'
import {
  AnimatedButton,
  PageMarker,
  SyncedScrollView,
  SyncedScrollViewContext,
  syncedScrollViewState,
} from '../../components/onboarding'
import { cn } from '../../utils/cn'
import { router } from 'expo-router'
import React, { useContext, useRef, useState } from 'react'
import { SafeAreaView, View, Dimensions, Image, ScrollView } from 'react-native'

const HINTS = [
  {
    imageUrl:
      'https://images.theconversation.com/files/76578/original/image-20150331-1231-1ttwii6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    title: 'Estética automotiva de alto padrão',
    subtitle:
      'Experimente uma limpeza excepcional sem sair do conforto da sua casa, ou da sua rotina de trabalho.',
  },
  {
    imageUrl:
      'https://images.theconversation.com/files/76578/original/image-20150331-1231-1ttwii6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    title: 'Profissionais altamente capacitados',
    subtitle:
      'Nossos colaboradores são altamente treinados para proporcionar um serviço confiável e tranquilo.',
  },
  {
    imageUrl:
      'https://images.theconversation.com/files/76578/original/image-20150331-1231-1ttwii6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
    title: 'Agendamento simples e fácil',
    subtitle: 'Apenas escolha o serviço e defina onde e quando. \nNós cuidaremos do resto!',
  },
] as const

export default function Onboarding() {
  const { width: screenWidth } = Dimensions.get('window')
  const imageWidth = screenWidth * 0.91 - 16

  const [page, setPage] = useState(0)

  const offsetPercentRef = useRef(0)
  const detailsScrollViewRef = useRef<ScrollView>(null)

  const { offsetPercent } = useContext(SyncedScrollViewContext)
  offsetPercent.addListener(({ value }) => {
    offsetPercentRef.current = value
  })

  const onPageChange = () => {
    const currentPage = offsetPercentRef.current * (HINTS.length - 1)
    setPage(currentPage)
  }

  const handleGoToNextHint = () => {
    detailsScrollViewRef.current?.scrollTo({ x: screenWidth * (page + 1), animated: true })
  }
  const handleGoToSignIn = () => {
    router.push('/signIn')
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
              ref={detailsScrollViewRef}
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
            <AnimatedButton
              isLastPage={page === HINTS.length - 1}
              onNext={handleGoToNextHint}
              onFinish={handleGoToSignIn}
            />
          </View>
        </View>
      </SafeAreaView>
    </SyncedScrollViewContext.Provider>
  )
}
