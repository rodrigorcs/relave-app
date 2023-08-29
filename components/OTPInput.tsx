import { cn } from '../utils/cn'
import React, { useRef, useState, FC } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { ClassNameValue } from 'tailwind-merge'

const determineAction = (currentCode: string, newCode: string): 'add' | 'delete' | null =>
  newCode.length > currentCode.length ? 'add' : 'delete'

interface ISingleDigitProps {
  digit: string
  isFocused: boolean
  customClassName?: ClassNameValue
}

const SingleDigit: FC<ISingleDigitProps> = ({ digit, isFocused, customClassName }) => (
  <View
    className={cn(
      'h-12 justify-center items-center rounded border bg-neutrals-white border-neutrals-200 w-11 shadow',
      isFocused && 'border-neutrals-300',
      customClassName,
    )}
  >
    <Text className="text-2xl text-center">{digit}</Text>
  </View>
)

interface IOTPInputProps {
  code: string
  setCode: (code: string) => void
  maximumLength: number
  setIsCodeReady: (isReady: boolean) => void
  customClassName?: ClassNameValue
  showError?: boolean
}

// TODO: [FIX] When backspacing the parenthesis+space, it doesn't allow to delete the parenthesis
const OTPInput: FC<IOTPInputProps> = ({
  code,
  setCode,
  maximumLength,
  setIsCodeReady,
  customClassName,
  showError,
}) => {
  const singleDigitsArray = new Array(maximumLength).fill(null)
  const inputRef = useRef<TextInput | null>(null)
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const handleOnPress = () => {
    setIsInputBoxFocused(true)
    inputRef?.current?.focus()
  }

  const handleTextChange = (newCode: string) => {
    const action = determineAction(code, newCode)
    if (action === 'add') {
      setIsCodeReady(newCode.length === maximumLength)
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maximumLength - 1))
    } else if (action === 'delete') {
      setIsCodeReady(false)
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    }
    setCode(newCode)
  }

  return (
    <View className={cn('self-center text-base text-neutrals-400', customClassName)}>
      <Pressable onPress={handleOnPress} className="flex-row justify-between">
        {singleDigitsArray.map((_, index) => {
          const digit = code[index] || ''
          const isValueFocused = isInputBoxFocused && index === currentIndex

          return (
            <SingleDigit
              key={index}
              digit={digit}
              isFocused={isValueFocused}
              customClassName={cn(
                index < maximumLength - 1 && 'mr-2',
                showError && 'border-feedback-negative-300',
              )}
            />
          )
        })}
      </Pressable>
      <TextInput
        value={code}
        onChangeText={handleTextChange}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={() => setIsInputBoxFocused(false)}
        className="absolute opacity-0"
      />
    </View>
  )
}

export default OTPInput
