import {
  CustomButton,
  CustomInput,
  CustomText,
  ECustomButtonVariants,
  ECustomTextVariants,
  HeaderProgressBar,
  SafeAreaView,
} from '../../components/common'
import { usersActions } from '../../core/actions/users'
import { useKeyboardVisibility } from '../../hooks'
import { getCurrentUser, signOut, storeName } from '../../state/slices/auth'
import { IAppState } from '../../state/store'
import { isIOS } from '../../utils/platform'
import { router } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AnyAction } from 'redux'

const getIsNameValid = (name: string) => {
  const trimmedName = name.trim()
  const isTooShort = trimmedName.length <= 3
  const hasMultipleWords = trimmedName.indexOf(' ') != -1
  const hasNumbers = /\d/.test(trimmedName)

  return !isTooShort && !hasNumbers && hasMultipleWords
}

export default function Name() {
  const dispatch = useDispatch()
  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))

  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setError(null)
  }, [name])

  const isNameValid = getIsNameValid(name)

  const handleNameChange = (newValue: string) => {
    setName(newValue)
  }

  const handleConfirmName = async () => {
    if (!isNameValid) return setError('Deve conter nome e sobrenome')
    if (!currentUser) throw new Error('User not found.')

    await usersActions.updateUser(currentUser.id, { name })
    dispatch(storeName(name))
    router.push('/(app)')
  }

  const scrollViewRef = useRef<ScrollView | null>(null)
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
      <SafeAreaView customClassName="flex-1 bg-common-background">
        <HeaderProgressBar progress={3 / 3} />
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View className="flex-1 px-4 py-12">
            <CustomText variant={ECustomTextVariants.HEADING2}>Qual é o seu nome?</CustomText>
            {false && (
              <>
                <CustomButton
                  onPress={() => dispatch(signOut as unknown as AnyAction)}
                  variant={ECustomButtonVariants.TERTIARY}
                  customClassName="mt-6"
                >
                  Sair
                </CustomButton>
              </>
            )}
            <CustomInput
              title="Nome e sobrenome"
              error={error}
              value={name}
              handleValueChange={handleNameChange}
              placeholder="Seu nome..."
              keyboardType="name-phone-pad"
              autoComplete="name"
              autoCorrect
              autoFocus
              customClassName="mt-6"
            />
          </View>
        </ScrollView>
        <View className="h-24 justify-center px-4">
          <CustomButton isDisabled={name?.trim().length === 0} onPress={handleConfirmName}>
            Continuar
          </CustomButton>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
