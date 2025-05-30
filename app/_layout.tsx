import { AuthProvider, PaymentsProvider } from '../components/providers'
import '../global.css'
import { store } from '../state/store'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import React, { useCallback } from 'react'
import { LogBox, StatusBar, View } from 'react-native'
import { Provider as ReduxProvider } from 'react-redux'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
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

  const appIsReady = fontsLoaded && !fontError

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync()
  }, [appIsReady])

  StatusBar.setBarStyle('dark-content')
  LogBox.ignoreLogs([`Image source "null" doesn't exist`]) // Ignore android warning when image source is null (ex: placeholder)

  if (!appIsReady) return <View className="flex-1 bg-common-background" />

  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        <PaymentsProvider>
          <>
            <View onLayout={onLayoutRootView} />
            <Slot />
          </>
        </PaymentsProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
