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
        <Stack screenOptions={{ headerTitle: '', headerShadowVisible: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="otpConfirmation" />
        </Stack>
      </AuthProvider>
    </ReduxProvider>
  )
}
