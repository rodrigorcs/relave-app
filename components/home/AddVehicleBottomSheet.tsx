import { vehicleBrandsActions } from '../../core/actions/vehicleBrands'
import { vehicleModelsActions } from '../../core/actions/vehicleModels'
import { vehiclesActions } from '../../core/actions/vehicles'
import { useAsyncData } from '../../hooks'
import { IUser } from '../../models/contracts/user'
import { IVehicle } from '../../models/contracts/vehicle'
import { IVehicleBrand } from '../../models/contracts/vehicleBrand'
import { IVehicleModel } from '../../models/contracts/vehicleModel'
import {
  BottomSheet,
  CustomText,
  ECustomTextVariants,
  CustomButton,
  IBottomSheetRefProps,
  Autocomplete,
} from '../common'
import React, { FC, useRef, useState } from 'react'
import { View } from 'react-native'

interface IProps {
  addVehicle: (vehicle: IVehicle) => void
  userId: IUser['id']
  isOpen: boolean
  close: () => void
}

export const AddVehicleBottomSheet: FC<IProps> = ({ addVehicle, userId, isOpen, close }) => {
  const HEIGHT = 500
  const [selectedBrand, setSelectedBrand] = useState<IVehicleBrand | null>(null)
  const [selectedModel, setSelectedModel] = useState<IVehicleModel | null>(null)

  const [vehicleBrands] = useAsyncData(() => vehicleBrandsActions.getAll())
  const [vehicleModels] = useAsyncData(
    selectedBrand ? () => vehicleModelsActions.getByBrandId(selectedBrand?.id) : null,
    [selectedBrand],
  )

  const handleCreateVehicle = async () => {
    if (!selectedBrand || !selectedModel) return
    const createdVehicle = await vehiclesActions.createVehicle({
      ownerId: userId,
      brandId: selectedBrand.id,
      brandName: selectedBrand.name,
      brandSlug: selectedBrand.slug,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
    })
    addVehicle(createdVehicle)
    close()
  }

  const bottomSheetRef = useRef<IBottomSheetRefProps>(null)

  return (
    <BottomSheet ref={bottomSheetRef} height={HEIGHT} isOpen={isOpen} close={close}>
      <View className="flex-1">
        <CustomText variant={ECustomTextVariants.HEADING4}>Adicionar carro</CustomText>
        {/* @ts-expect-error // FIXME: IVehicleBrand does not satisfy IOption */}
        <Autocomplete<IVehicleBrand>
          options={vehicleBrands}
          selectedOption={selectedBrand}
          setSelectedOption={setSelectedBrand}
          title="Marca"
          placeholder="Digite a marca..."
        />
        {/* @ts-expect-error // FIXME: IVehicleModel does not satisfy IOption */}
        <Autocomplete<IVehicleModel>
          options={vehicleModels}
          selectedOption={selectedModel}
          setSelectedOption={setSelectedModel}
          title="Modelo"
          placeholder="Digite o modelo..."
          isDisabled={!selectedBrand}
        />
        <CustomButton onPress={handleCreateVehicle} customClassName="absolute bottom-0 w-full">
          Confirmar escolha
        </CustomButton>
      </View>
    </BottomSheet>
  )
}
