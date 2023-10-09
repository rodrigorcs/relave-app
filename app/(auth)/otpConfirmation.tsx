import {
  CustomButton,
  CustomText,
  ECustomTextVariants,
  HeaderProgressBar,
  SafeAreaView,
} from '../../components/common'
import { OTPInput } from '../../components/otpConfirmation'
import { useKeyboardVisibility } from '../../hooks'
import { EInputMasks } from '../../models/constants/EInputMasks'
import { confirmOTPToken, getUserPhoneNumber } from '../../state/slices/auth'
import { IAppState } from '../../state/store'
import { applyMask } from '../../utils/mask'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

export default function OTPConfirmation() {
  const dispatch = useDispatch()
  const userPhoneNumber = useSelector(({ auth }: IAppState) => getUserPhoneNumber(auth))
  const scrollViewRef = useRef<ScrollView | null>(null)

  const [otpToken, setOTPToken] = useState('')
  const [isTokenReady, setIsTokenReady] = useState(false)
  const [showError, setShowError] = useState(false)

  const isKeyboardOpen = useKeyboardVisibility()

  useEffect(() => {
    if (isKeyboardOpen) scrollViewRef.current?.scrollToEnd({ animated: true })
  })

  const handleConfirmOTP = () => {
    if (!isTokenReady) return setShowError(true)
    dispatch(confirmOTPToken(otpToken) as unknown as AnyAction)
  }

  useEffect(() => {
    setShowError(false)
  }, [otpToken])

  useEffect(() => {
    handleConfirmOTP()
    setShowError(false)
  }, [isTokenReady])

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1" keyboardVerticalOffset={96}>
      <SafeAreaView customClassName="flex flex-1 bg-common-background">
        <HeaderProgressBar progress={2 / 3} />
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View className="flex-1 px-4 py-12">
            <CustomText variant={ECustomTextVariants.HEADING2}>
              Digite o código de 6 dígitos que enviamos por SMS
            </CustomText>
            <View className="flex-row">
              <CustomText
                variant={ECustomTextVariants.BODY2}
                customClassName="pt-4 text-neutrals-600"
              >
                SMS enviado para{' '}
                {userPhoneNumber && applyMask(userPhoneNumber, EInputMasks.PHONE_NUMBER)}
              </CustomText>
            </View>
            <View className="items-center">
              <OTPInput
                code={otpToken}
                setCode={setOTPToken}
                maximumLength={6}
                setIsCodeReady={setIsTokenReady}
                customClassName="mt-12"
                showError={showError}
              />
              {showError && (
                <CustomText
                  variant={ECustomTextVariants.HELPER2}
                  customClassName="mt-2 text-feedback-negative-300"
                >
                  {`O código deve conter 6 dígitos`}
                </CustomText>
              )}
            </View>
            <View className="mt-6 flex-row items-center justify-center">
              <CustomText variant={ECustomTextVariants.BODY2} customClassName="text-neutrals-500">
                Não recebeu?&nbsp;
              </CustomText>
              <CustomText
                variant={ECustomTextVariants.EXPRESSIVE2}
                customClassName="text-brand-500"
              >
                Reenviar
              </CustomText>
            </View>
          </View>
        </ScrollView>
        <View className="h-24 justify-center px-4">
          <CustomButton isDisabled={!isTokenReady} onPress={handleConfirmOTP}>
            Continuar
          </CustomButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
