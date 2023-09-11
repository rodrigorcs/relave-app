import { CustomText, ECustomTextVariants } from '../components/common'
import {
  AddVehicleCard,
  AddVehicleBottomSheet,
  ServiceBundleCard,
  UserVehicleCard,
} from '../components/home'
import { serviceBundlesActions } from '../core/actions/serviceBundles'
import { vehiclesActions } from '../core/actions/vehicles'
import { useAsyncData } from '../hooks/useAsyncData'
import { EServiceBundleTiers } from '../models/contracts/serviceBundle'
import { IVehicle } from '../models/contracts/vehicle'
import { getCurrentUser } from '../state/slices/auth'
import { IAppState } from '../state/store'
import {
  Flash as FlashIcon,
  Spark as SparkIcon,
  DropletHalf as DropletIcon,
} from 'iconoir-react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const TIER_ICONS = Object.freeze({
  [EServiceBundleTiers.SIMPLE]: <FlashIcon />,
  [EServiceBundleTiers.ADVANCED]: <SparkIcon />,
  [EServiceBundleTiers.PREMIUM]: <DropletIcon />,
})

enum EBottomSheets {
  ADD_VEHICLE = 'AddVehicle',
  ADD_SERVICES = 'AddServices',
}

export default function Home() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<IVehicle['id'] | null>(null)
  const [openBottomSheet, setOpenBottomSheet] = useState<string | null>(null)

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  if (!currentUser) return //FIXME: Add auth boundaries so currentUser is always truthy

  const [vehicles] = useAsyncData(
    currentUser ? () => vehiclesActions.getVehiclesByUserId(currentUser.id) : null,
  )
  const [serviceBundles] = useAsyncData(() => serviceBundlesActions.getAllWithDetails())

  const handleChangeVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
  }

  const handleOpenAddVehicleBottomSheet = useCallback(() => {
    setOpenBottomSheet(EBottomSheets.ADD_VEHICLE)
  }, [])

  const handleCloseBottomSheet = useCallback(() => {
    setOpenBottomSheet(null)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex flex-1 bg-brand-500">
        <View className="flex-1">
          <View className="py-8 bg-common-background">
            <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4">
              Selecione seu carro
            </CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
              {(vehicles ?? []).map((vehicle, index) => {
                const isSelected = vehicle.id === selectedVehicleId
                return (
                  <UserVehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    handleChangeVehicle={handleChangeVehicle}
                    isSelected={isSelected}
                    index={index}
                  />
                )
              })}
              <AddVehicleCard onPress={handleOpenAddVehicleBottomSheet} />
            </ScrollView>
          </View>
          <View className="flex-1 py-8 bg-brand-500">
            <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4" white>
              Serviços
            </CustomText>
            <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-4 mt-1" white>
              Escolha o tipo de cuidado que o seu carro precisa
            </CustomText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-4">
              {(serviceBundles || []).map((serviceBundle, index) => {
                const isLastItem = serviceBundles && index === serviceBundles?.length - 1
                return (
                  <ServiceBundleCard
                    key={serviceBundle.id}
                    serviceBundle={serviceBundle}
                    Icon={TIER_ICONS[serviceBundle.tier]}
                    customClassName={isLastItem && 'mr-4'}
                  />
                )
              })}
            </ScrollView>
          </View>
        </View>
        <AddVehicleBottomSheet
          userId={currentUser.id}
          addVehicle={() => {}}
          isOpen={openBottomSheet === EBottomSheets.ADD_VEHICLE}
          close={handleCloseBottomSheet}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
