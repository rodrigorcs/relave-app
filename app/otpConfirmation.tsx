import { Link } from 'expo-router'
import { Text } from 'react-native'

export default function OTPConfirmation() {
  return (
    <>
      <Text>OTP Confirmation</Text>
      <Link href="/signin">Go to Sign In</Link>
    </>
  )
}
