import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import React, { FC } from 'react'
import { View, TextInput, Text, KeyboardTypeOptions } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  error: string | null
  value: string
  handleValueChange: (text: string) => void
  placeholder: string
  keyboardType?: KeyboardTypeOptions
  prefix?: string
  customClassName?: ClassNameValue
}

export const CustomInput: FC<IProps> = ({
  error,
  value,
  handleValueChange,
  placeholder,
  keyboardType,
  prefix,
  customClassName,
}) => {
  return (
    <View>
      <View
        className={cn(
          'h-12 flex-row justify-center rounded-xl border border-neutrals-200 px-3',
          error && 'border-feedback-negative-300',
          customClassName,
        )}
      >
        {prefix && (
          <Text className="mr-2 self-center text-base text-neutrals-400" style={{ lineHeight: 20 }}>
            {prefix}
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <TextInput
            value={value}
            onChangeText={handleValueChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            className="flex-1"
            placeholderTextColor={theme.colors['neutrals-400']}
            style={{ fontSize: 16 }} // TODO: Remove default lineHeight from tailwind so that `text-base` class can be used
          />
        </View>
      </View>
      {error && (
        <Text className="mt-1 text-xs font-normal text-feedback-negative-300">{error}</Text>
      )}
    </View>
  )
}
