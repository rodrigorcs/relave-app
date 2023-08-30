import MessagesIllustration from '../assets/vectors/illustration-messages.svg'
import OTPInput from '../components/OTPInput'
import { confirmOTPToken, getCurrentUser } from '../state/slices/auth'
import { IAppState } from '../state/store'
import { cn } from '../utils/cn'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

export default function OTPConfirmation() {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))

  const [otpToken, setOTPToken] = useState('')
  const [isTokenReady, setIsTokenReady] = useState(false)
  const [showError, setShowError] = useState(false)

  console.log('user in otpConfirmation', currentUser)

  const handleConfirmOTP = () => {
    if (!isTokenReady) return setShowError(true)
    dispatch(confirmOTPToken(otpToken) as unknown as AnyAction)
  }

  useEffect(() => {
    handleConfirmOTP()
    setShowError(false)
  }, [isTokenReady])

  return (
    <SafeAreaView className="flex flex-1 bg-common-background">
      <View className="flex-1 px-6 py-2">
        <View className="my-8 w-fit items-center">
          <MessagesIllustration height={112} pointerEvents="none" />
        </View>
        <Text className="text-xl font-medium">
          Digite o código de 6 dígitos que enviamos por SMS
        </Text>
        <Text className="text-base font-normal text-neutrals-500">
          SMS enviado para +55 (71) 99315-8381
        </Text>
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
            <Text className="mt-2 text-xs font-normal text-feedback-negative-300">
              {`O código deve conter 6 dígitos`}
            </Text>
          )}
        </View>
        <View className="mt-4 flex-row items-center justify-center">
          <Text className="text-xs font-normal text-neutrals-500">Não recebeu?&nbsp;</Text>
          <Text className="text-xs underline text-brand-700">Reenviar</Text>
        </View>
        <TouchableOpacity
          className={cn(
            'mt-6 h-12 items-center justify-center rounded bg-brand-500',
            !isTokenReady && 'bg-brand-300',
          )}
          activeOpacity={!isTokenReady ? 1 : 0.2}
          onPress={handleConfirmOTP}
        >
          <Text className="text-base font-semibold text-neutrals-white">Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
