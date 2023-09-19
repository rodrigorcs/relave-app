import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { Check as CheckIcon } from 'iconoir-react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

interface IProps {
  id: string
  isSelected: boolean
  select?: (id: string) => void
  unselect?: (id: string) => void
}

export const Checkbox: FC<IProps> = ({ id, isSelected, select, unselect }) => {
  const toggleSelection = () => {
    if (select && !isSelected) select(id)
    if (unselect && isSelected) unselect(id)
  }

  return (
    <TouchableOpacity
      onPress={toggleSelection}
      className={cn(
        'w-6 h-6 rounded items-center justify-center',
        isSelected ? 'bg-brand-500' : 'border border-neutrals-500',
      )}
      activeOpacity={0.6}
    >
      {isSelected && (
        <CheckIcon
          width={16}
          height={16}
          strokeWidth={2.5}
          color={theme.colors['neutrals-white']}
        />
      )}
    </TouchableOpacity>
  )
}
