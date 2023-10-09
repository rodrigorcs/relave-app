import {
  CustomButton,
  CustomInput,
  CustomText,
  ECustomTextVariants,
  HeaderProgressBar,
  SafeAreaView,
} from '../../components/common'
import { storeName } from '../../state/slices/auth'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { useDispatch } from 'react-redux'

const getIsNameValid = (name: string) => {
  const trimmedName = name.trim()
  const isTooShort = trimmedName.length <= 3 
  const hasMultipleWords = trimmedName.indexOf(' ') != -1
  const hasNumbers = (/\d/).test(trimmedName)

  return !isTooShort && !hasNumbers && hasMultipleWords
}

export default function Name() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [name])
  
  const isNameValid = getIsNameValid(name)

  const handleNameChange = (newValue: string) => {
    setName(newValue)
  }

  const handleConfirmName = () => {
    if (!isNameValid) return setError('Deve conter nome e sobrenome')
    dispatch(storeName(name))
    router.push('/phoneNumber')
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={96} className="flex-1">
      <SafeAreaView customClassName="flex flex-1 bg-common-background">
        <HeaderProgressBar progress={1 / 3} />
        <View className="flex-1">
          <View className="flex-1 px-4 py-12">
            <CustomText variant={ECustomTextVariants.HEADING2}>
              Qual é o seu nome?
            </CustomText>
            <CustomInput
              title="Nome e sobrenome"
              error={error}
              value={name}
              handleValueChange={handleNameChange}
              placeholder="Rodrigo Costa dos Santos"
              keyboardType='name-phone-pad'
              customClassName="mt-6"
            />
          </View>
        </View>
        <View className="justify-center h-24 px-4">
          <CustomButton isDisabled={name?.trim().length === 0} onPress={handleConfirmName}>
            Continuar
          </CustomButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
