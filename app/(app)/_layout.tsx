import { Config } from '../../config/config'
import '../../global.css'
import { getIsUserSignedIn } from '../../state/slices/auth'
import { IAppState } from '../../state/store'
import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Layout() {
  const userIsSignedIn = useSelector((state: IAppState) => getIsUserSignedIn(state.auth))
  if (!userIsSignedIn) return <Redirect href="/(auth)" />

  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: Config.IS_PROD ? 'Relave' : `Relave (${Config.STAGE})`,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen name="appointment" options={{ title: 'Relave' }} />
      <Stack.Screen name="checkout" options={{ title: 'Resumo' }} />
      <Stack.Screen
        name="orderConfirmation"
        options={{ title: 'Confirmação', headerBackVisible: false }}
      />
    </Stack>
  )
}
