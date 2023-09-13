import MessagesIllustration from '../assets/vectors/illustration-messages.svg'
import { CustomButton, CustomText, ECustomTextVariants } from '../components/common'
import { OTPInput } from '../components/otpConfirmation'
import { confirmOTPToken, getIsUserSignedIn } from '../state/slices/auth'
import { IAppState } from '../state/store'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

export default function OTPConfirmation() {
  const dispatch = useDispatch()
  const isUserSignedIn = useSelector(({ auth }: IAppState) => getIsUserSignedIn(auth))

  const [otpToken, setOTPToken] = useState('')
  const [isTokenReady, setIsTokenReady] = useState(false)
  const [showError, setShowError] = useState(false)

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

  useEffect(() => {
    if (isUserSignedIn) router.push('/home')
  }, [isUserSignedIn])

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1 px-6 py-2">
        <View className="my-8 w-fit items-center">
          <MessagesIllustration height={112} pointerEvents="none" />
        </View>
        <CustomText variant={ECustomTextVariants.HEADING3}>
          Digite o código de 6 dígitos que enviamos por SMS
        </CustomText>
        <View className="flex-row">
          <CustomText
            variant={ECustomTextVariants.SUBHEADING2}
            customClassName="font-normal text-neutrals-500"
          >
            SMS enviado para&nbsp;
          </CustomText>
          <CustomText
            variant={ECustomTextVariants.SUBHEADING2}
            customClassName="font-normal text-neutrals-500 underline"
          >
            +55 (71) 99315-8381
          </CustomText>
        </View>
        <View className="items-center">
          <OTPInput
            code={otpToken}
            setCode={setOTPToken}
            maximumLength={6}
            setIsCodeReady={setIsTokenReady}
            customClassName="mt-8"
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
        <View className="mt-4 flex-row items-center justify-center">
          <CustomText variant={ECustomTextVariants.HELPER2} customClassName="text-neutrals-500">
            Não recebeu?&nbsp;
          </CustomText>
          <CustomText
            variant={ECustomTextVariants.HELPER2}
            customClassName="underline text-brand-700"
          >
            Reenviar
          </CustomText>
        </View>
        <CustomButton isDisabled={!isTokenReady} onPress={handleConfirmOTP} customClassName="mt-6">
          Continuar
        </CustomButton>
      </View>
    </SafeAreaView>
  )
}
