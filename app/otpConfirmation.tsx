import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function OTPConfirmation() {
  return (
    <View>
      <Feather name="arrow-left" size={24} />
      <Text>Qual o número do seu celular?</Text>
      <Text>Você receberá um código por SMS</Text>
      <Link href="/">Go to Sign In</Link>
    </View>
  )
}
