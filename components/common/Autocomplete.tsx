import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomInput } from './CustomInput'
import { CustomText, ECustomTextVariants } from './CustomText'
import {
  Check as CheckIcon,
  NavArrowDown as ChevronDownIcon,
  NavArrowUp as ChevronUpIcon,
} from 'iconoir-react-native'
import React, { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native'

interface IOption extends Record<string, unknown> {
  id: string
  name: string
}

interface IProps<T extends IOption> {
  options: T[]
  selectedOption: T | null
  setSelectedOption?: Dispatch<SetStateAction<T | null>>
}

interface IDropdownExpandButtonProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
}

const DropdownExpandButton: FC<IDropdownExpandButtonProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <TouchableOpacity onPress={toggleDropdown}>
      {isDropdownOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </TouchableOpacity>
  )
}

export const Autocomplete = <T extends IOption>({
  options,
  selectedOption,
  setSelectedOption,
}: IProps<T>) => {
  const [input, setInput] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef<TextInput>(null)
  const hasSelectedOption = useRef(false)

  // FIXME: CustomInput overrides state input value, hasSelectedOption is an workaround
  const handleChangeSelectedOption = (option: T) => {
    setInput(option.name)
    hasSelectedOption.current = true
    if (setSelectedOption) setSelectedOption(option)
    setIsDropdownOpen(false)
    inputRef.current?.blur()
  }

  const handleInputChange = (input: string) => {
    if (hasSelectedOption.current) return (hasSelectedOption.current = false)
    setInput(input)
  }

  return (
    <>
      <CustomText variant={ECustomTextVariants.HEADING5} customClassName="mt-4">
        Marca
      </CustomText>
      <CustomInput
        value={input}
        handleValueChange={handleInputChange}
        error={null}
        placeholder="Selecione a marca"
        customClassName="mt-1"
        onFocus={() => setIsDropdownOpen(true)}
        inputRef={inputRef}
        iconRight={
          <DropdownExpandButton
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
          />
        }
      />
      {isDropdownOpen && (
        <View className="rounded-lg shadow bg-neutrals-white mt-1">
          <FlatList
            data={
              input.length >= 2
                ? options.filter((option) =>
                    option.name.toLowerCase().includes(input.toLowerCase()),
                  )
                : options
            }
            className="h-40"
            renderItem={({ item: option }) => {
              const isSelected = selectedOption && option.id === selectedOption.id
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => handleChangeSelectedOption(option)}
                  className={cn(
                    'flex-row justify-between items-center px-4 py-3 border-b border-neutrals-100',
                    isSelected && 'bg-neutrals-100',
                  )}
                >
                  <CustomText
                    variant={
                      isSelected ? ECustomTextVariants.EXPRESSIVE2 : ECustomTextVariants.BODY2
                    }
                  >
                    {option.name}
                  </CustomText>
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
            }}
          />
        </View>
      )}
    </>
  )
}
