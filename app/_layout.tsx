import { AuthProvider } from '../components/providers/AuthProvider'
import '../global.css'
import { store } from '../state/store'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export default function Layout() {
  useFonts({
    InterBlack: require('../assets/fonts/Inter-Black.ttf'),
    InterExtraBold: require('../assets/fonts/Inter-ExtraBold.ttf'),
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
    InterLight: require('../assets/fonts/Inter-Light.ttf'),
    InterExtraLight: require('../assets/fonts/Inter-ExtraLight.ttf'),
    InterThin: require('../assets/fonts/Inter-Thin.ttf'),

    DMSansBlack: require('../assets/fonts/DMSans-Black.ttf'),
    DMSansExtraBold: require('../assets/fonts/DMSans-ExtraBold.ttf'),
    DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMSansSemiBold: require('../assets/fonts/DMSans-SemiBold.ttf'),
    DMSansMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMSansRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    DMSansLight: require('../assets/fonts/DMSans-Light.ttf'),
    DMSansExtraLight: require('../assets/fonts/DMSans-ExtraLight.ttf'),
    DMSansThin: require('../assets/fonts/DMSans-Thin.ttf'),
  })

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
