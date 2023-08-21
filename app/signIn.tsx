import { Link } from 'expo-router'
import { Text } from 'react-native'

export default function SignIn() {
  return (
    <>
      <Text>Sign In</Text>
      <Link href="/otpConfirmation">Go to OTP</Link>
    </>
  )
}
