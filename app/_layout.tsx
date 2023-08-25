import '../global.css'
import store from '../state/store'
import { Stack } from 'expo-router'
import { Provider } from 'react-redux'

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerTitle: '', headerShadowVisible: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="otpConfirmation" />
      </Stack>
    </Provider>
  )
}
