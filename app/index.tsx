import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import NotificationsIllustration from '../assets/vectors/illustration-push-notifications.svg'
import { Link } from 'expo-router'

export default function SignIn() {
  return (
    <View className="flex-1 bg-white p-6">
      <View className="w-fit items-center my-8">
        <NotificationsIllustration height={112} />
      </View>
      <Text className="text-xl font-medium">Qual o número do seu celular?</Text>
      <Text className="text-base font-normal text-gray-500">Você receberá um código por SMS</Text>
      <View className="my-6 h-12 px-3 rounded border border-gray-200 justify-center flex-row">
        <Text className="self-center text-base text-gray-400 mr-2">+55</Text>
        <TextInput
          placeholder="(71) 90000-0000"
          keyboardType="phone-pad"
          className="flex-1 text-base"
          style={{ lineHeight: 0 }} // TODO: Fix 'Text not centered when using text-base class
        />
      </View>
      <TouchableOpacity className="h-12 rounded bg-blue-700 justify-center items-center">
        <Link href="/otpConfirmation" className="text-white font-semibold text-base">
          Receber SMS
        </Link>
      </TouchableOpacity>
    </View>
  )
}
