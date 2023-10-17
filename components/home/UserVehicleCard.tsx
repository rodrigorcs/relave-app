import { useCloudImage } from '../../hooks'
import { Endpoints } from '../../models/constants/Endpoints'
import { IVehicle } from '../../models/contracts/vehicle'
import { theme } from '../../theme'
import { cn } from '../../utils/cn'
import { CustomText, ECustomTextVariants } from '../common'
import { Skeleton } from '../common/Skeleton'
import {
  Car as BrandFallbackIcon,
  Check as CheckIcon,
  Cancel as CloseIcon,
} from 'iconoir-react-native'
import React, { FC, useEffect, useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'

interface IBrandLogoProps {
  imageUrl: string | null
  hasImageUrlError?: boolean
}

enum EImageState {
  SUCCESS = 'success',
  LOADING = 'loading',
  ERROR = 'error',
}

const BrandLogo: FC<IBrandLogoProps> = ({ imageUrl, hasImageUrlError }) => {
  const [imageState, setImageState] = useState<EImageState>(EImageState.LOADING)

  useEffect(() => {
    if (hasImageUrlError) setImageState(EImageState.ERROR)
  }, [hasImageUrlError])

  return (
    <Skeleton customClassName="h-8 aspect-square" isLoaded={imageState !== EImageState.LOADING}>
      <Image
        source={{ uri: imageUrl ?? undefined }}
        resizeMode="center"
        className={cn('h-10 w-10')}
        style={{
          position: imageState === EImageState.SUCCESS ? undefined : 'absolute',
          top: imageState === EImageState.SUCCESS ? undefined : -1000,
        }}
        onLoadEnd={() => setImageState(EImageState.SUCCESS)}
        onError={() => setImageState(EImageState.ERROR)}
      />
      {imageState === EImageState.ERROR && (
        <View className="h-10 w-10 items-center justify-center">
          <BrandFallbackIcon
            width={20}
            height={20}
            strokeWidth={1.5}
            color={theme.colors['neutrals-800']}
          />
        </View>
      )}
    </Skeleton>
  )
}

interface IProps {
  vehicle: IVehicle
  index: number
  isSelected: boolean
  handleChangeVehicle: (vehicle: IVehicle) => void
  handleDeleteVehicle: (vehicleId: IVehicle['id']) => void
}

export const UserVehicleCard: FC<IProps> = ({
  vehicle,
  index,
  isSelected,
  handleChangeVehicle,
  handleDeleteVehicle,
}) => {
  const [brandLogoUrl, hasImageError] = useCloudImage(
    Endpoints.VEHICLE_BRANDS_LOGOS(vehicle.brandSlug),
  )

  return (
    <View key={vehicle.id} className={cn(index > 0 && 'ml-2', index === 0 && 'ml-4')}>
      <TouchableOpacity
        className={cn(
          'mb-2 h-32 w-32 items-center justify-center rounded-2xl bg-neutrals-100',
          isSelected && 'border border-brand-500',
        )}
        activeOpacity={0.6}
        onPress={() => handleChangeVehicle(vehicle)}
      >
        <BrandLogo imageUrl={brandLogoUrl} hasImageUrlError={!!hasImageError} />
        <CustomText variant={ECustomTextVariants.EYEBROW2} customClassName="mt-3">
          {vehicle.brandName}
        </CustomText>
        <CustomText variant={ECustomTextVariants.BODY3} customClassName="text-neutrals-600">
          {vehicle.modelName}
        </CustomText>
      </TouchableOpacity>
      {isSelected && (
        <View className="absolute bottom-0 left-[54] h-5 w-5 items-center justify-center rounded-full bg-brand-500">
          <CheckIcon
            width={16}
            height={16}
            strokeWidth={2}
            color={theme.colors['neutrals-white']}
          />
        </View>
      )}
      <TouchableOpacity
        className="absolute right-2 top-2 h-6 w-6 items-center justify-center rounded-full"
        onPress={() => handleDeleteVehicle(vehicle.id)}
      >
        <CloseIcon
          width={16}
          height={16}
          strokeWidth={2}
          color={isSelected ? theme.colors['neutrals-200'] : theme.colors['neutrals-400']}
        />
      </TouchableOpacity>
    </View>
  )
}
