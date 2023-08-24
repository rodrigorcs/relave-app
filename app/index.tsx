import { useMaskedInput } from '../assets/hooks/useMaskedInput'
import NotificationsIllustration from '../assets/vectors/illustration-push-notifications.svg'
import { EInputMasks } from '../models/constants/EInputMasks'
import { cn } from '../utils/cn'
import { Link } from 'expo-router'
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

export default function SignIn() {
  const [phoneNumber, handlePhoneNumberChange, isPhoneNumberValid] = useMaskedInput(
    EInputMasks.PHONE_NUMBER,
  )

  return (
    <SafeAreaView className="flex flex-1 bg-red-500">
      <View className="flex-1 bg-white px-6 py-2">
        <View className="my-8 w-fit items-center">
          <NotificationsIllustration height={112} />
        </View>
        <Text className="text-xl font-medium">Qual o número do seu celular?</Text>
        <Text className="text-base font-normal text-gray-500">Você receberá um código por SMS</Text>
        <View
          data-test={isPhoneNumberValid}
          className="my-6 h-12 flex-row justify-center rounded border border-gray-200 px-3"
        >
          <Text className="mr-2 self-center text-base text-gray-400" style={{ lineHeight: 20 }}>
            +55
          </Text>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TextInput
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              placeholder="(71) 90000-0000"
              keyboardType="phone-pad"
              className="flex-1"
              placeholderTextColor={colors.gray[400]}
              style={{ fontSize: 16 }} // TODO: Remove default lineHeight from tailwind so that `text-base` class can be used
            />
          </View>
        </View>
        <TouchableOpacity
          className={cn(
            'h-12 items-center justify-center rounded bg-blue-700',
            !isPhoneNumberValid && 'bg-blue-700/[.70]',
          )}
          disabled={!isPhoneNumberValid}
        >
          <Link href="/otpConfirmation" className="text-base font-semibold text-white">
            Receber SMS
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
