import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { IconoirProvider } from 'iconoir-react-native'
import React, { FC, ReactNode, RefObject } from 'react'
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
  onFocus?: () => void
  inputRef?: RefObject<TextInput>
  iconLeft?: ReactNode
  iconRight?: ReactNode
  isDisabled?: boolean
}

export const CustomInput: FC<IProps> = ({
  error,
  value,
  handleValueChange,
  placeholder,
  keyboardType,
  prefix,
  customClassName,
  onFocus,
  inputRef,
  iconLeft,
  iconRight,
  isDisabled = false,
}) => {
  return (
    <View>
      <View
        className={cn(
          'h-12 flex-row justify-center items-center rounded-xl border border-neutrals-200 px-3',
          error && 'border-feedback-negative-300',
          customClassName,
        )}
      >
        {prefix && (
          <Text className="mr-2 self-center text-base text-neutrals-400" style={{ lineHeight: 20 }}>
            {prefix}
          </Text>
        )}
        <IconoirProvider
          iconProps={{
            width: 24,
            height: 24,
            color: isDisabled ? theme.colors['neutrals-200'] : theme.colors['neutrals-600'],
          }}
        >
          {iconLeft && iconLeft}
          <View style={{ flex: 1 }}>
            <TextInput
              ref={inputRef}
              value={value}
              onChangeText={handleValueChange}
              placeholder={placeholder}
              keyboardType={keyboardType}
              className="flex-1"
              placeholderTextColor={
                isDisabled ? theme.colors['neutrals-200'] : theme.colors['neutrals-400']
              }
              onFocus={onFocus}
              editable={!isDisabled}
              selectTextOnFocus={!isDisabled}
              style={{ fontSize: 16 }} // TODO: Remove default lineHeight from tailwind so that `text-base` class can be used
            />
          </View>
          {iconRight && iconRight}
        </IconoirProvider>
      </View>
      {error && (
        <Text className="mt-1 text-xs font-normal text-feedback-negative-300">{error}</Text>
      )}
    </View>
  )
}
