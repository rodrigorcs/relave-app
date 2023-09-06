import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import React, { FC } from 'react'
import { View, TextInput, Text } from 'react-native'

interface IProps {
  hasError: boolean
  maskedPhoneNumber: string
  handlePhoneNumberChange: (text: string) => void
}

export const CustomInput: FC<IProps> = ({
  hasError,
  maskedPhoneNumber,
  handlePhoneNumberChange,
}) => {
  return (
    <View>
      <View
        className={cn(
          'mt-6 h-12 flex-row justify-center rounded border border-neutrals-200 px-3',
          hasError && 'border-feedback-negative-300',
        )}
      >
        <Text className="mr-2 self-center text-base text-neutrals-400" style={{ lineHeight: 20 }}>
          +55
        </Text>
        <View style={{ flex: 1 }}>
          <TextInput
            value={maskedPhoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="(71) 90000-0000"
            keyboardType="phone-pad"
            className="flex-1"
            placeholderTextColor={theme.colors['neutrals-400']}
            style={{ fontSize: 16 }} // TODO: Remove default lineHeight from tailwind so that `text-base` class can be used
          />
        </View>
      </View>
      {hasError && (
        <Text className="mt-1 text-xs font-normal text-feedback-negative-300">
          Número invalido, verifique.
        </Text>
      )}
    </View>
  )
}
