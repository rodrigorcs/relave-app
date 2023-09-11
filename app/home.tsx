import { CustomText, ECustomTextVariants } from '../components/common'
import { AddVehicleBottomSheet } from '../components/home/AddVehicleBottomSheet'
import { ServiceBundleCard } from '../components/home/ServiceBundleCard'
import { UserVehicleCard } from '../components/home/UserVehicleCard'
import { serviceBundlesActions } from '../core/actions/serviceBundles'
import { vehiclesActions } from '../core/actions/vehicles'
import { useAsyncData } from '../hooks/useAsyncData'
import { EServiceBundleTiers } from '../models/contracts/serviceBundle'
import { IVehicle } from '../models/contracts/vehicle'
import { getCurrentUser } from '../state/slices/auth'
import { IAppState } from '../state/store'
import { theme } from '../theme'
import { cn } from '../utils/cn'
import {
  Plus as PlusIcon,
  Flash as FlashIcon,
  DropletHalf as DropletIcon,
  Spark as SparkIcon,
} from 'iconoir-react-native'
import React, { useCallback, useState } from 'react'
import { TouchableOpacity, SafeAreaView, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const TIER_ICONS = Object.freeze({
  [EServiceBundleTiers.SIMPLE]: <FlashIcon />,
  [EServiceBundleTiers.ADVANCED]: <SparkIcon />,
  [EServiceBundleTiers.PREMIUM]: <DropletIcon />,
})

export default function Home() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<IVehicle['id'] | null>(null)
  const [openBottomSheet, setOpenBottomSheet] = useState<string | null>(null)

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  if (!currentUser) return //FIXME: Add auth boundaries so currentUser is always truthy

  const [vehicles] = useAsyncData(
    currentUser ? () => vehiclesActions.getVehiclesByUserId(currentUser.id) : null,
  )

  const [serviceBundles] = useAsyncData(() => serviceBundlesActions.getAllWithDetails())

  console.log({ serviceBundles })

  const handleChangeVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
  }

  const handleOpenAddVehicleBottomSheet = useCallback(() => {
    setOpenBottomSheet('AddVehicle')
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
              <TouchableOpacity
                className={cn(
                  'h-32 w-32 bg-neutrals-100 rounded-2xl items-center justify-center ml-2 mr-4',
                )}
                onPress={handleOpenAddVehicleBottomSheet}
              >
                <PlusIcon color={theme.colors['neutrals-800']} width={24} height={24} />
                <CustomText variant={ECustomTextVariants.BODY3} customClassName="mt-2 text-center">
                  {`Adicionar\ncarro`}
                </CustomText>
              </TouchableOpacity>
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
          isOpen={openBottomSheet === 'AddVehicle'}
          close={handleCloseBottomSheet}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}
