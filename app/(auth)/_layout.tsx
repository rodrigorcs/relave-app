import '../../global.css'
import { Stack } from 'expo-router'
import React from 'react'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="signIn" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="otpConfirmation" options={{ title: 'Confirmação SMS' }} />
    </Stack>
  )
}
