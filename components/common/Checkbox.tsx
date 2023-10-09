import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { Check as CheckIcon } from 'iconoir-react-native'
import React, { FC } from 'react'
import { View } from 'react-native'

interface IProps {
  isSelected: boolean
}

export const Checkbox: FC<IProps> = ({ isSelected }) => {
  return (
    <View
      className={cn(
        'h-6 w-6 items-center justify-center rounded',
        isSelected ? 'bg-brand-500' : 'border border-neutrals-500',
      )}
    >
      {isSelected && (
        <CheckIcon
          width={16}
          height={16}
          strokeWidth={2.5}
          color={theme.colors['neutrals-white']}
        />
      )}
    </View>
  )
}
