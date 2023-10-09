import '../../global.css'
import { getCurrentUser } from '../../state/slices/auth'
import { IAppState } from '../../state/store'
import { Redirect, Stack, usePathname } from 'expo-router'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Layout() {
  const user = useSelector((state: IAppState) => getCurrentUser(state.auth))
  const currentRoute = usePathname()

  if (user && currentRoute !== '/name') {
    if (!user.name) return <Redirect href='/name' />
    return <Redirect href='/(app)' />
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="phoneNumber" options={{ title: 'Seu número' }} />
      <Stack.Screen name="otpConfirmation" options={{ title: 'Código SMS' }} />
      <Stack.Screen name="name" options={{ title: 'Seu nome' }} />
    </Stack>
  )
}
