import { vehiclesActions } from '../../core/actions/vehicles'
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
import firestore from '@react-native-firebase/firestore'
import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

interface IProps {
  selectedBrand: IVehicleBrand | null
  selectedModel: IVehicleModel | null
  setSelectedBrand: Dispatch<SetStateAction<IVehicleBrand | null>>
  setSelectedModel: Dispatch<SetStateAction<IVehicleModel | null>>
  addVehicle: (vehicle: IVehicle) => void
  userId: IUser['id']
  isOpen: boolean
  close: () => void
}

export const AddVehicleBottomSheet: FC<IProps> = ({
  selectedBrand,
  selectedModel,
  setSelectedBrand,
  setSelectedModel,
  addVehicle,
  userId,
  isOpen,
  close,
}) => {
  const HEIGHT = 400
  const [vehicleBrands, setVehicleBrands] = useState<IVehicleBrand[] | null>(null)
  const [vehicleModels, setVehicleModels] = useState<IVehicleModel[] | null>(null)

  useEffect(() => {
    const execute = async () => {
      const snapshot = await firestore().collection('vehicleBrands').get()
      const _vehicleBrands = snapshot.docs.map((doc) => doc.data()) as IVehicleBrand[]
      setVehicleBrands(_vehicleBrands)
    }
    execute()
  }, [])

  useEffect(() => {
    if (!selectedBrand) return

    const execute = async () => {
      const snapshot = await firestore()
        .collection('vehicleModels')
        .where('brandId', '==', selectedBrand.id)
        .get()
      const _vehicleModels = snapshot.docs.map((doc) => doc.data()) as IVehicleModel[]
      setVehicleModels(_vehicleModels)
    }
    execute()
  }, [selectedBrand])

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
        />
        <CustomButton onPress={handleCreateVehicle} customClassName="mt-8">
          Confirmar escolha
        </CustomButton>
      </View>
    </BottomSheet>
  )
}
