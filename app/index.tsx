import NotificationsIllustration from '../assets/vectors/illustration-push-notifications.svg'
import { CustomButton, CustomInput, CustomText, ECustomTextVariants } from '../components/common'
import { useMaskedInput } from '../hooks/useMaskedInput'
import { EInputMasks } from '../models/constants/EInputMasks'
import { sendOTPToken } from '../state/slices/auth'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

export default function SignIn() {
  const dispach = useDispatch()

  const [maskedPhoneNumber, unmaskedPhoneNumber, handlePhoneNumberChange, isPhoneNumberValid] =
    useMaskedInput(EInputMasks.PHONE_NUMBER)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setShowError(false)
  }, [unmaskedPhoneNumber])

  const handleReceiveOTP = async () => {
    if (!isPhoneNumberValid) return setShowError(true)
    dispach(sendOTPToken(unmaskedPhoneNumber) as unknown as AnyAction)
    router.push('/otpConfirmation')
  }

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1 px-6 py-2">
        <View className="my-8 w-fit items-center">
          <NotificationsIllustration height={112} pointerEvents="none" />
        </View>
        <CustomText variant={ECustomTextVariants.HEADING1}>
          Qual o número do seu celular?
        </CustomText>
        <CustomText variant={ECustomTextVariants.SUBTITLE}>
          Você receberá um código por SMS
        </CustomText>
        <CustomInput
          hasError={showError}
          maskedPhoneNumber={maskedPhoneNumber}
          handlePhoneNumberChange={handlePhoneNumberChange}
        />
        <CustomButton isDisabled={!isPhoneNumberValid} onPress={handleReceiveOTP}>
          Receber SMS
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
