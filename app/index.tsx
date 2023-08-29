import NotificationsIllustration from '../assets/vectors/illustration-push-notifications.svg'
import { useMaskedInput } from '../hooks/useMaskedInput'
import { EInputMasks } from '../models/constants/EInputMasks'
import { sendOTPToken } from '../state/slices/auth'
import { theme } from '../theme'
import { cn } from '../utils/cn'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
        <Text className="text-xl font-medium text-neutrals-800">Qual o número do seu celular?</Text>
        <Text className="text-base font-normal text-neutrals-500">
          Você receberá um código por SMS
        </Text>
        <View>
          <View
            className={cn(
              'mt-6 h-12 flex-row justify-center rounded border border-neutrals-200 px-3',
              showError && 'border-feedback-negative-300',
            )}
          >
            <Text
              className="mr-2 self-center text-base text-neutrals-400"
              style={{ lineHeight: 20 }}
            >
              +55
            </Text>
            <View style={{ flex: 1 }}>
              <TextInput
                value={maskedPhoneNumber}
                onChangeText={handlePhoneNumberChange}
                placeholder="(71) 90000-0000"
                keyboardType="phone-pad"
                className="flex-1"
                placeholderTextColor={theme.colors['neutrals-400']}
                style={{ fontSize: 16 }} // TODO: Remove default lineHeight from tailwind so that `text-base` class can be used
              />
            </View>
          </View>
          {showError && (
            <Text className="mt-1 text-xs font-normal text-feedback-negative-300">
              Número invalido, verifique.
            </Text>
          )}
        </View>
        <TouchableOpacity
          className={cn(
            'mt-6 h-12 items-center justify-center rounded bg-brand-500',
            !isPhoneNumberValid && 'bg-brand-300',
          )}
          onPress={handleReceiveOTP}
          activeOpacity={!isPhoneNumberValid ? 1 : 0.2}
        >
          <Text className="text-base font-semibold text-neutrals-white">Receber SMS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
