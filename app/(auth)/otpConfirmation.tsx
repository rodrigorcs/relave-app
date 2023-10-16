import {
  CustomButton,
  CustomText,
  ECustomTextVariants,
  HeaderProgressBar,
  SafeAreaView,
} from '../../components/common'
import { OTPInput } from '../../components/otpConfirmation'
import { useKeyboardVisibility, useTimer } from '../../hooks'
import { EInputMasks } from '../../models/constants/EInputMasks'
import { confirmOTPToken, getUserPhoneNumber, resendOTPToken } from '../../state/slices/auth'
import { IAppState } from '../../state/store'
import { cn } from '../../utils/cn'
import { applyMask } from '../../utils/mask'
import { isIOS } from '../../utils/platform'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

export default function OTPConfirmation() {
  const dispatch = useDispatch()
  const userPhoneNumber = useSelector(({ auth }: IAppState) => getUserPhoneNumber(auth))
  const scrollViewRef = useRef<ScrollView | null>(null)

  const [otpToken, setOTPToken] = useState('')
  const [isTokenReady, setIsTokenReady] = useState(false)
  const [showOTPError, setShowOTPError] = useState(false)

  const { timer: resendOTPTimer, startTimer } = useTimer(30)
  const isResendOTPDisabled = resendOTPTimer > 0

  const isKeyboardOpen = useKeyboardVisibility()

  useEffect(() => {
    if (isKeyboardOpen) scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [])

  const handleConfirmOTP = () => {
    if (!isTokenReady) return setShowOTPError(true)
    dispatch(confirmOTPToken(otpToken) as unknown as AnyAction)
  }

  const handleResendOTP = () => {
    if (!userPhoneNumber) throw new Error('Verifique o número de telefone.')
    dispatch(resendOTPToken(userPhoneNumber) as unknown as AnyAction)
    startTimer()
  }

  useEffect(() => {
    setShowOTPError(false)
  }, [otpToken])

  useEffect(() => {
    handleConfirmOTP()
    setShowOTPError(false)
  }, [isTokenReady])

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      className="flex-1"
      keyboardVerticalOffset={96}
    >
      <SafeAreaView customClassName="flex flex-1 bg-common-background">
        <HeaderProgressBar progress={2 / 3} />
        <ScrollView ref={scrollViewRef} className="flex-1" showsVerticalScrollIndicator={false}>
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
                showError={showOTPError}
              />
              {showOTPError && (
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
              <TouchableOpacity onPress={handleResendOTP} disabled={isResendOTPDisabled}>
                <CustomText
                  variant={ECustomTextVariants.EXPRESSIVE2}
                  customClassName={cn('text-brand-500', isResendOTPDisabled && 'text-neutrals-300')}
                >
                  Reenviar
                </CustomText>
              </TouchableOpacity>
              {isResendOTPDisabled && (
                <CustomText
                  variant={ECustomTextVariants.EXPRESSIVE3}
                  customClassName="text-neutrals-300"
                >
                  {` (${resendOTPTimer.toString().padStart(2, '0')})`}
                </CustomText>
              )}
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
