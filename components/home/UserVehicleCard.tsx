import { IVehicle } from '../../models/contracts/vehicle'
import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from '../common'
import { Check as CheckIcon } from 'iconoir-react-native'
import React, { FC } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

interface IProps {
  vehicle: IVehicle
  index: number
  isSelected: boolean
  handleChangeVehicle: (vehicleId: string) => void
}

export const UserVehicleCard: FC<IProps> = ({
  vehicle,
  index,
  isSelected,
  handleChangeVehicle,
}) => {
  return (
    <View key={vehicle.id} className={cn(index > 0 && 'ml-2', index === 0 && 'ml-4')}>
      <TouchableOpacity
        className={cn(
          'h-32 w-32 mb-2 bg-neutrals-100 rounded-2xl items-center justify-center',
          isSelected && 'border border-brand-500',
        )}
        activeOpacity={0.6}
        onPress={() => handleChangeVehicle(vehicle.id)}
      >
        {/* <Image source={imageSrc} resizeMode="center" className="h-8 w-8 mb-4" /> */}
        <CustomText variant={ECustomTextVariants.EYEBROW2}>{vehicle.brandName}</CustomText>
        <CustomText variant={ECustomTextVariants.BODY3}>{vehicle.modelName}</CustomText>
      </TouchableOpacity>
      {isSelected && (
        <View className="w-5 h-5 bg-brand-500 rounded-full items-center justify-center absolute bottom-0 left-[54]">
          <CheckIcon
            width={16}
            height={16}
            strokeWidth={2}
            color={theme.colors['neutrals-white']}
          />
        </View>
      )}
    </View>
  )
}
