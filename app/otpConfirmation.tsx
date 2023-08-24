import MessagesIllustration from '../assets/vectors/illustration-messages.svg'
import OTPInput from '../components/OTPInput'
import { cn } from '../utils/cn'
import { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function OTPConfirmation() {
  const [otpCode, setOTPCode] = useState('')
  const [isPinReady, setIsPinReady] = useState(false)
  const maximumCodeLength = 4
  const [showError, setShowError] = useState(false)

  const handleConfirmOTP = () => {
    if (!isPinReady) return setShowError(true)
  }

  useEffect(() => {
    setShowError(false)
  }, [isPinReady])

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <View className="flex-1 px-6 py-2">
        <View className="my-8 w-fit items-center">
          <MessagesIllustration height={112} pointerEvents="none" />
        </View>
        <Text className="text-xl font-medium">
          Digite o código de 4 dígitos que enviamos por SMS
        </Text>
        <Text className="text-base font-normal text-gray-500">
          SMS enviado para +55 (71) 99315-8381
        </Text>
        <View className="items-center">
          <OTPInput
            code={otpCode}
            setCode={setOTPCode}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
            customClassName="mt-8"
            showError={showError}
          />
          {showError && (
            <Text className="mt-2 text-xs font-normal text-red-500">
              {`O código deve conter ${maximumCodeLength} dígitos`}
            </Text>
          )}
        </View>
        <View className="mt-4 flex-row items-center justify-center">
          <Text className="text-xs font-normal text-gray-500">Não recebeu?&nbsp;</Text>
          <Text className="text-xs underline text-blue-900">Reenviar</Text>
        </View>
        <TouchableOpacity
          className={cn(
            'mt-6 h-12 items-center justify-center rounded bg-blue-700',
            !isPinReady && 'bg-blue-700/[.70]',
          )}
          activeOpacity={!isPinReady ? 1 : 0.2}
          onPress={handleConfirmOTP}
        >
          <Text className="text-base font-semibold text-white">Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
