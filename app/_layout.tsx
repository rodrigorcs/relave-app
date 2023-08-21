import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="otpConfirmation" />
    </Stack>
  )
}
