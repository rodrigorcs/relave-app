import { AuthProvider } from '../components/providers/AuthProvider'
import '../global.css'
import { store } from '../state/store'
import { Stack } from 'expo-router'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export default function Layout() {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Cadastro' }} />
          <Stack.Screen name="otpConfirmation" options={{ title: 'Confirmação' }} />
          <Stack.Screen name="home" options={{ title: 'Lavei', headerBackVisible: false }} />
        </Stack>
      </AuthProvider>
    </ReduxProvider>
  )
}
