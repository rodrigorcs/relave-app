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
        'w-6 h-6 rounded items-center justify-center',
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
