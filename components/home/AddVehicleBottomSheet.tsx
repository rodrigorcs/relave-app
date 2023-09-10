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
  isOpen: boolean
}

export const AddVehicleBottomSheet: FC<IProps> = ({
  selectedBrand,
  selectedModel,
  setSelectedBrand,
  setSelectedModel,
  isOpen,
}) => {
  const [vehicleBrands, setVehicleBrands] = useState<IVehicleBrand[] | null>(null)
  const [vehicleModels, setVehicleModels] = useState<IVehicleModel[] | null>(null)

  useEffect(() => {
    if (isOpen) bottomSheetRef?.current?.scrollTo(0)
  }, [isOpen])

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

  const bottomSheetRef = useRef<IBottomSheetRefProps>(null)

  return (
    <BottomSheet ref={bottomSheetRef} height={400}>
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
        <CustomButton onPress={() => {}} customClassName="mt-8">
          Confirmar escolha
        </CustomButton>
      </View>
    </BottomSheet>
  )
}
