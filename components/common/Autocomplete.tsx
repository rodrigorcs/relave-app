import { usePosition } from '../../hooks'
import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomInput } from './CustomInput'
import { CustomText, ECustomTextVariants } from './CustomText'
import { LoadingSpinner } from './LoadingSpinner'
import {
  Check as CheckIcon,
  NavArrowDown as ChevronDownIcon,
  NavArrowUp as ChevronUpIcon,
} from 'iconoir-react-native'
import React, { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, TextInput, TextInputProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

interface IDropdownExpandButtonProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
  isDisabled?: boolean
}

const DropdownExpandButton: FC<IDropdownExpandButtonProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
  isDisabled = false,
}) => {
  const toggleDropdown = () => {
    if (!isDisabled) setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <TouchableOpacity onPress={toggleDropdown} activeOpacity={isDisabled ? 1 : 0.2}>
      {isDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </TouchableOpacity>
  )
}

interface IOption extends Record<string, unknown> {
  id: string
  name: string
}

interface IProps<T extends IOption> {
  options: T[]
  selectedOption: T | null
  defaultOption?: T | null
  onChange?: (selectedOption: T | null) => void
  onInputChange?: (input: string) => void
  filterOnType?: boolean
  title?: string
  placeholder?: string
  isDisabled?: boolean
  isLoading?: boolean
  children?: (option: IOption) => ReactNode
  large?: boolean
  autoComplete?: TextInputProps['autoComplete']
  autoCorrect?: TextInputProps['autoCorrect']
}

export const Autocomplete = <T extends IOption>({
  options,
  selectedOption,
  defaultOption,
  onChange,
  onInputChange,
  filterOnType = true,
  title,
  placeholder = '',
  isDisabled = false,
  isLoading = false,
  children,
  large,
  autoComplete,
  autoCorrect,
}: IProps<T>) => {
  const [input, setInput] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const hasSelectedOption = useRef(false)
  const { ref: dropdownRef, position: dropdownPosition } = usePosition()

  useEffect(() => {
    if (onInputChange && input) onInputChange(input)
  }, [onInputChange, input])

  useEffect(() => {
    if (!selectedOption) {
      setInput('')
      setIsDropdownOpen(false)
    }
  }, [selectedOption])

  useEffect(() => {
    if (defaultOption) setInput(defaultOption.name)
  }, [])

  // FIXME: CustomInput overrides state input value, hasSelectedOption is an workaround
  const handleChangeSelectedOption = (option: T) => {
    setInput(option.name)
    hasSelectedOption.current = true
    if (onChange) onChange(option)
    setIsDropdownOpen(false)
    inputRef.current?.blur()
  }

  const handleInputChange = (input: string) => {
    if (hasSelectedOption.current) return (hasSelectedOption.current = false)
    setInput(input)
  }

  const getDropdownOptions = (): T[] => {
    if (!filterOnType || input.length === 0) return options
    return options?.filter((option) => option.name.toLowerCase().includes(input.toLowerCase()))
  }

  const dropdownOptions = getDropdownOptions()
  const hasOptions = dropdownOptions?.length > 0

  return (
    <>
      {title && (
        <CustomText variant={ECustomTextVariants.HEADING5} customClassName="mt-4">
          {title}
        </CustomText>
      )}
      <CustomInput
        value={input}
        handleValueChange={handleInputChange}
        error={null}
        placeholder={placeholder}
        customClassName="mt-1"
        onFocus={() => setIsDropdownOpen(true)}
        inputRef={inputRef}
        iconRight={
          <DropdownExpandButton
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            isDisabled={isDisabled}
          />
        }
        isDisabled={isDisabled}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
      />
      <View ref={dropdownRef} className={cn('z-10', !isDropdownOpen && 'hidden')}>
        {isDropdownOpen && (
          <View
            className={cn(
              `absolute w-full rounded-lg`,
              dropdownPosition.endPosY && `top-[${dropdownPosition.endPosY}]`,
              hasOptions && 'max-h-40',
              hasOptions && large && 'max-h-80',
            )}
          >
            <View className={cn(`mt-1 rounded-lg bg-neutrals-white shadow`)}>
              {isLoading ? (
                <View className="flex-row items-center justify-center bg-neutrals-white px-4 py-3">
                  <LoadingSpinner color={theme.colors['neutrals-500']} />
                </View>
              ) : (
                <>
                  {dropdownOptions.length === 0 ? (
                    <View className="flex-row items-center bg-neutrals-white px-4 py-3">
                      <CustomText variant={ECustomTextVariants.HELPER1}>Sem opções.</CustomText>
                    </View>
                  ) : (
                    <ScrollView
                      className="rounded-lg"
                      nestedScrollEnabled
                      keyboardShouldPersistTaps="always"
                    >
                      {dropdownOptions.map((option) => {
                        const isSelected = selectedOption && option.id === selectedOption.id
                        return (
                          <TouchableOpacity
                            key={option.id}
                            onPress={() => handleChangeSelectedOption(option)}
                            className={cn(
                              'flex-row items-center justify-between border-b border-neutrals-100 bg-neutrals-white px-4 py-3',
                              isSelected && 'bg-neutrals-100',
                            )}
                          >
                            {children ? (
                              children(option)
                            ) : (
                              <CustomText
                                variant={
                                  isSelected
                                    ? ECustomTextVariants.EXPRESSIVE2
                                    : ECustomTextVariants.BODY2
                                }
                              >
                                {option.name}
                              </CustomText>
                            )}
                            {isSelected && (
                              <CheckIcon
                                width={24}
                                height={24}
                                strokeWidth={2}
                                color={theme.colors['brand-500']}
                                className="ml-2"
                              />
                            )}
                          </TouchableOpacity>
                        )
                      })}
                    </ScrollView>
                  )}
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </>
  )
}
