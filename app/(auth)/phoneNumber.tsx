import {
  CustomButton,
  CustomInput,
  CustomText,
  ECustomButtonVariants,
  ECustomTextVariants,
  HeaderProgressBar,
  SafeAreaView,
} from '../../components/common'
import { authActions } from '../../core/actions/auth'
import { useKeyboardVisibility, useMaskedInput } from '../../hooks'
import { EInputMasks } from '../../models/constants/EInputMasks'
import { signOut, storeConfirmationObj, storePhoneNumberToOTP } from '../../state/slices/auth'
import { isIOS } from '../../utils/platform'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

export default function PhoneNumber() {
  const dispatch = useDispatch()
  const scrollViewRef = useRef<ScrollView | null>(null)

  const [maskedPhoneNumber, unmaskedPhoneNumber, handlePhoneNumberChange, isPhoneNumberValid] =
    useMaskedInput(EInputMasks.PHONE_NUMBER)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setError(null)
  }, [unmaskedPhoneNumber])

  const handleReceiveOTP = async () => {
    if (!isPhoneNumberValid) return setError('Número invalido, verifique.')

    setIsLoading(true)
    const otpConfirmationObj = await authActions.sendOTPToken(unmaskedPhoneNumber)
    storeConfirmationObj(otpConfirmationObj)
    dispatch(storePhoneNumberToOTP(unmaskedPhoneNumber))
    setIsLoading(false)

    router.push('/otpConfirmation')
  }

  const isKeyboardOpen = useKeyboardVisibility()

  useEffect(() => {
    if (isKeyboardOpen) scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={96}
      className="flex-1"
    >
      <SafeAreaView customClassName="flex flex-1 bg-common-background">
        <HeaderProgressBar progress={1 / 3} />
        <ScrollView ref={scrollViewRef} className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-4 py-12">
            <CustomText variant={ECustomTextVariants.HEADING2}>
              Qual o número do seu celular?
            </CustomText>
            <CustomText
              variant={ECustomTextVariants.BODY2}
              customClassName="mt-4 text-neutrals-600"
            >
              Você receberá um código por SMS
            </CustomText>
            <CustomInput
              title="Insira seu número"
              error={error}
              value={maskedPhoneNumber}
              handleValueChange={handlePhoneNumberChange}
              placeholder="(71) 90000-0000"
              keyboardType="phone-pad"
              prefix="+55"
              customClassName="mt-6"
              autoFocus
            />
            {false && (
              <>
                <CustomButton
                  onPress={() => dispatch(signOut as unknown as AnyAction)}
                  variant={ECustomButtonVariants.TERTIARY}
                  customClassName="mt-6"
                >
                  Sair
                </CustomButton>
                <CustomButton
                  onPress={() => router.push('/(app)')}
                  variant={ECustomButtonVariants.TERTIARY}
                  customClassName="mt-2"
                >
                  Ir para Home
                </CustomButton>
              </>
            )}
          </View>
        </ScrollView>
        <View className="h-24 justify-center px-4">
          <CustomButton
            isDisabled={!isPhoneNumberValid}
            onPress={handleReceiveOTP}
            isLoading={isLoading}
          >
            Receber SMS
          </CustomButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
