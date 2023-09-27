import '../../global.css'
import { Stack } from 'expo-router'
import React from 'react'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: 'Lavei', headerBackVisible: false }} />
      <Stack.Screen name="appointment" options={{ title: 'Lavei' }} />
      <Stack.Screen name="checkout" options={{ title: 'Resumo' }} />
      <Stack.Screen
        name="orderConfirmation"
        options={{ title: 'Confirmação', headerBackVisible: false }}
      />
    </Stack>
  )
}
