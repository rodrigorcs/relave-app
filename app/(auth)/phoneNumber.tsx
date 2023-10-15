import {
  CustomButton,
  CustomInput,
  CustomText,
  ECustomButtonVariants,
  ECustomTextVariants,
  HeaderProgressBar,
  SafeAreaView,
} from '../../components/common'
import { useMaskedInput } from '../../hooks'
import { EInputMasks } from '../../models/constants/EInputMasks'
import { sendOTPToken, signOut, storePhoneNumberToOTP } from '../../state/slices/auth'
import { isIOS } from '../../utils/platform'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { AnyAction } from 'redux'

export default function PhoneNumber() {
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
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={96}
      className="flex-1"
    >
      <SafeAreaView customClassName="flex flex-1 bg-common-background">
        <HeaderProgressBar progress={1 / 3} />
        <View className="flex-1">
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
        </View>
        <View className="h-24 justify-center px-4">
          <CustomButton isDisabled={!isPhoneNumberValid} onPress={handleReceiveOTP}>
            Receber SMS
          </CustomButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
