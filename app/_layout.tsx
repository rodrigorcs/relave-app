import { AuthProvider } from '../components/providers/AuthProvider'
import { PaymentsProvider } from '../components/providers/PaymentsProvider'
import '../global.css'
import { getIsUserSignedIn } from '../state/slices/auth'
import { IAppState, store } from '../state/store'
import { useFonts } from 'expo-font'
import { Slot, Stack } from 'expo-router'
import React from 'react'
import { Provider as ReduxProvider, useSelector } from 'react-redux'

function AppRouter() {
  const userIsSignedIn = useSelector((state: IAppState) => getIsUserSignedIn(state.auth))
  console.log({ userIsSignedIn })
  return (
    <Stack>{userIsSignedIn ? <Stack.Screen name="(app)" /> : <Stack.Screen name="(auth)" />}</Stack>
  )
}

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
        <PaymentsProvider>
          <Slot />
        </PaymentsProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
