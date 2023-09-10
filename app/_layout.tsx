import { AuthProvider } from '../components/providers/AuthProvider'
import '../global.css'
import { store } from '../state/store'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export default function Layout() {
  useFonts({
    Montserrat_900Black: require('../assets/fonts/Montserrat/Montserrat-Black.ttf'),
    Montserrat_800ExtraBold: require('../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
    Montserrat_700Bold: require('../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    Montserrat_600SemiBold: require('../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    Montserrat_500Medium: require('../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    Montserrat_400Regular: require('../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    Montserrat_300Light: require('../assets/fonts/Montserrat/Montserrat-Light.ttf'),
    Montserrat_200ExtraLight: require('../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf'),
    Montserrat_100Thin: require('../assets/fonts/Montserrat/Montserrat-Thin.ttf'),
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
