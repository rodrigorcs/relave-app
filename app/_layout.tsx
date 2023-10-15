import { AuthProvider } from '../components/providers/AuthProvider'
import { PaymentsProvider } from '../components/providers/PaymentsProvider'
import '../global.css'
import { store } from '../state/store'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import React from 'react'
import { LogBox, StatusBar } from 'react-native'
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

  StatusBar.setBarStyle('dark-content')

  LogBox.ignoreLogs(['Image source "null" doesn\'t exist']) // Ignore android warning when image source is null (ex: placeholder)

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <PaymentsProvider>
          <Slot />
        </PaymentsProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
