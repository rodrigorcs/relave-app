import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from './CustomText'
import { IconoirProvider } from 'iconoir-react-native'
import React, { FC, ReactNode, RefObject, useState } from 'react'
import { View, TextInput, KeyboardTypeOptions, TextInputProps } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

interface IProps {
  error: string | null
  value: string
  handleValueChange: (text: string) => void
  placeholder: string
  title?: string
  keyboardType?: KeyboardTypeOptions
  prefix?: string
  customClassName?: ClassNameValue
  onFocus?: () => void
  inputRef?: RefObject<TextInput>
  iconLeft?: ReactNode
  iconRight?: ReactNode
  isDisabled?: boolean
  autoComplete?: TextInputProps['autoComplete']
  autoCorrect?: TextInputProps['autoCorrect']
  autoFocus?: TextInputProps['autoFocus']
}

export const CustomInput: FC<IProps> = ({
  error,
  value,
  handleValueChange,
  placeholder,
  title,
  keyboardType,
  prefix,
  customClassName,
  onFocus,
  inputRef,
  iconLeft,
  iconRight,
  isDisabled = false,
  autoComplete,
  autoCorrect,
  autoFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleOnFocus = () => {
    setIsFocused(true)
    if (onFocus) onFocus()
  }

  const handleOnBlur = () => {
    setIsFocused(false)
  }

  return (
    <View className={cn(customClassName)}>
      {title && (
        <CustomText variant={ECustomTextVariants.HEADING5} customClassName="mb-1 text-neutrals-700">
          {title}
        </CustomText>
      )}
      <View
        className={cn(
          'h-14 flex-row items-center justify-center rounded-xl border border-neutrals-400 px-3',
          isFocused && 'border-neutrals-600',
          error && 'border-feedback-negative-300',
        )}
      >
        {prefix && (
          <CustomText variant={ECustomTextVariants.BODY2} customClassName="mr-2 text-neutrals-400">
            {prefix}
          </CustomText>
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
              className="flex-1 font-[DMSansRegular]"
              placeholderTextColor={
                isDisabled ? theme.colors['neutrals-200'] : theme.colors['neutrals-400']
              }
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              editable={!isDisabled}
              selectTextOnFocus={!isDisabled}
              style={{ fontSize: 16 }} // TODO: Remove default lineHeight from tailwind so that `text-base` class can be used
              autoComplete={autoComplete}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
            />
          </View>
          {iconRight && iconRight}
        </IconoirProvider>
      </View>
      {error && (
        <CustomText
          variant={ECustomTextVariants.HELPER2}
          customClassName="mt-1 text-feedback-negative-300"
        >
          {error}
        </CustomText>
      )}
    </View>
  )
}
