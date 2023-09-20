import NotificationsIllustration from '../assets/vectors/illustration-push-notifications.svg'
import { CustomButton, CustomInput, CustomText, ECustomTextVariants } from '../components/common'
import { useMaskedInput } from '../hooks'
import { EInputMasks } from '../models/constants/EInputMasks'
import { sendOTPToken, signOut, storePhoneNumberToOTP } from '../state/slices/auth'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

export default function SignIn() {
  const dispatch = useDispatch()

  const [maskedPhoneNumber, unmaskedPhoneNumber, handlePhoneNumberChange, isPhoneNumberValid] =
    useMaskedInput(EInputMasks.PHONE_NUMBER)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [unmaskedPhoneNumber])

  const handleReceiveOTP = async () => {
    if (!isPhoneNumberValid) return setError('Número invalido, verifique.')
    dispatch(sendOTPToken(unmaskedPhoneNumber) as unknown as AnyAction)
    dispatch(storePhoneNumberToOTP(unmaskedPhoneNumber))
    router.push('/otpConfirmation')
  }

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1 px-6 py-2">
        <View className="my-8 w-fit items-center">
          <NotificationsIllustration height={112} pointerEvents="none" />
        </View>
        <CustomText variant={ECustomTextVariants.HEADING3}>
          Qual o número do seu celular?
        </CustomText>
        <CustomText
          variant={ECustomTextVariants.SUBHEADING2}
          customClassName="font-normal text-neutrals-500"
        >
          Você receberá um código por SMS
        </CustomText>
        <CustomInput
          error={error}
          value={maskedPhoneNumber}
          handleValueChange={handlePhoneNumberChange}
          placeholder="(71) 90000-0000"
          keyboardType="phone-pad"
          prefix="+55"
          customClassName="mt-6"
        />
        <CustomButton
          isDisabled={!isPhoneNumberValid}
          onPress={handleReceiveOTP}
          customClassName="mt-6"
        >
          Receber SMS
        </CustomButton>
        <CustomButton
          onPress={() => dispatch(signOut as unknown as AnyAction)}
          customClassName="mt-6"
        >
          Sair
        </CustomButton>
        <CustomButton onPress={() => router.push('/home')} customClassName="mt-2">
          Ir para Home
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
