import '../global.css'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack screenOptions={{ headerTitle: '', headerShadowVisible: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="otpConfirmation" />
    </Stack>
  )
}
