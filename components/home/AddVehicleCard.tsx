import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from '../common'
import { Plus as PlusIcon } from 'iconoir-react-native'
import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'

interface IProps {
  onPress: () => void
  isFirst?: boolean
}

export const AddVehicleCard: FC<IProps> = ({ onPress, isFirst }) => {
  return (
    <TouchableOpacity
      className={cn(
        'ml-2 mr-4 h-32 w-32 items-center justify-center rounded-2xl bg-neutrals-100',
        isFirst && 'ml-4',
      )}
      onPress={onPress}
    >
      <PlusIcon color={theme.colors['neutrals-800']} width={24} height={24} />
      <CustomText variant={ECustomTextVariants.BODY3} customClassName="mt-2 text-center">
        {`Adicionar\ncarro`}
      </CustomText>
    </TouchableOpacity>
  )
}
