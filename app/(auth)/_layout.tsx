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
      <Stack.Screen name="index" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="otpConfirmation" options={{ title: 'Confirmação SMS' }} />
    </Stack>
  )
}
