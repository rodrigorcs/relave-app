import '../../global.css'
import { getIsUserSignedIn } from '../../state/slices/auth'
import { IAppState } from '../../state/store'
import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Layout() {
  const userIsSignedIn = useSelector((state: IAppState) => getIsUserSignedIn(state.auth))
  if (userIsSignedIn) return <Redirect href="/(app)" />

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="name" options={{ title: 'Seu nome' }} />
      <Stack.Screen name="phoneNumber" options={{ title: 'Seu número' }} />
      <Stack.Screen name="otpConfirmation" options={{ title: 'Código SMS' }} />
    </Stack>
  )
}
