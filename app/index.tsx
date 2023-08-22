import { Text, TouchableOpacity, View } from 'react-native'

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Qual o número do seu celular?</Text>
      <Text>Você receberá um código por SMS</Text>
      <TouchableOpacity>
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  )
}
