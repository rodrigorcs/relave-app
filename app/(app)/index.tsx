import { CustomText, ECustomTextVariants, SafeAreaView } from '../../components/common'
import {
  AddVehicleCard,
  AddVehicleBottomSheet,
  ServiceBundleCard,
  UserVehicleCard,
} from '../../components/home'
import { AddServicesBottomSheet } from '../../components/home/AddServicesBottomSheet'
import { UserVehicleCardSkeleton, ServiceBundleCardSkeleton } from '../../components/home/skeletons'
import { serviceBundlesActions } from '../../core/actions/serviceBundles'
import { vehiclesActions } from '../../core/actions/vehicles'
import { useAsyncData, useSkeletonArray } from '../../hooks'
import {
  EServiceBundleTiers,
  IServiceBundleWithDetails,
} from '../../models/contracts/serviceBundle'
import { IVehicle } from '../../models/contracts/vehicle'
import { getCurrentUser } from '../../state/slices/auth'
import {
  getSelectedServiceBundle,
  getSelectedVehicle,
  setSelectedServiceBundle,
  setSelectedVehicle,
} from '../../state/slices/cart'
import { IAppState } from '../../state/store'
import {
  Flash as FlashIcon,
  Spark as SparkIcon,
  DropletHalf as DropletIcon,
} from 'iconoir-react-native'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'

const TIER_ICONS = Object.freeze({
  [EServiceBundleTiers.SIMPLE]: <FlashIcon />,
  [EServiceBundleTiers.ADVANCED]: <SparkIcon />,
  [EServiceBundleTiers.PREMIUM]: <DropletIcon />,
})

export default function Home() {
  const dispatch = useDispatch()

  const [openAddVehicleBottomSheet, setOpenAddVehicleBottomSheet] = useState<boolean>(false)
  const [addedVehicle, setAddedVehicle] = useState<IVehicle | null>(null)

  const currentUser = useSelector(({ auth }: IAppState) => getCurrentUser(auth))
  const selectedVehicle = useSelector(({ cart }: IAppState) => getSelectedVehicle(cart))
  const selectedServiceBundle = useSelector(({ cart }: IAppState) => getSelectedServiceBundle(cart))

  if (!currentUser) throw new Error('No currentUser')

  const [vehicles, isLoadingVehicles] = useAsyncData(
    () => vehiclesActions.getVehiclesByUserId(currentUser.id),
    [addedVehicle],
  )

  const [serviceBundles, isLoadingServiceBundles] = useAsyncData(() =>
    serviceBundlesActions.getAllWithDetails(),
  )
  const vehicleSkeletons = useSkeletonArray(3)
  const serviceBundleSkeletons = useSkeletonArray(3)

  const handleChangeVehicle = (vehicle: IVehicle) => {
    dispatch(setSelectedVehicle(vehicle))
  }

  const handleAddVehicle = (vehicle: IVehicle) => {
    setAddedVehicle(vehicle)
  }

  const handleOpenAddVehicleBottomSheet = useCallback(() => {
    setOpenAddVehicleBottomSheet(true)
  }, [])

  const handleCloseAddVehicleBottomSheet = useCallback(() => {
    setOpenAddVehicleBottomSheet(false)
  }, [])

  const handleCloseAddServicesBottomSheet = useCallback(() => {
    dispatch(setSelectedServiceBundle(null))
  }, [])

  const handleChooseServiceBundle = (serviceBundle: IServiceBundleWithDetails) => {
    dispatch(setSelectedServiceBundle(serviceBundle))
  }

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView customClassName="flex flex-1 bg-brand-500">
          <View className="flex-1">
            <View className="py-8 bg-common-background">
              <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4">
                Selecione seu carro
              </CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row mt-4"
              >
                {isLoadingVehicles ? (
                  vehicleSkeletons.map((_skeleton, index) => (
                    <UserVehicleCardSkeleton key={index} index={index} />
                  ))
                ) : (
                  <>
                    {(vehicles ?? []).map((vehicle, index) => {
                      const isSelected = vehicle.id === selectedVehicle?.id
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
                  </>
                )}
                <AddVehicleCard
                  onPress={handleOpenAddVehicleBottomSheet}
                  isFirst={(vehicles ?? []).length === 0}
                />
              </ScrollView>
            </View>
            <View className="flex-1 pt-6 pb-2 bg-brand-500">
              <CustomText variant={ECustomTextVariants.HEADING3} customClassName="ml-4" white>
                Serviços
              </CustomText>
              <CustomText variant={ECustomTextVariants.BODY3} customClassName="ml-4 mt-1" white>
                Escolha o tipo de cuidado que o seu carro precisa
              </CustomText>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row mt-4"
              >
                {isLoadingServiceBundles ? (
                  <>
                    {serviceBundleSkeletons.map((_skeleton, index) => (
                      <ServiceBundleCardSkeleton key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {(serviceBundles || []).map((serviceBundle, index) => {
                      const isLastItem = serviceBundles && index === serviceBundles?.length - 1
                      const previousBundle =
                        index > 0 && serviceBundles ? serviceBundles[index - 1] : null
                      return (
                        <ServiceBundleCard
                          key={serviceBundle.id}
                          serviceBundle={serviceBundle}
                          previousBundleName={previousBundle?.name}
                          onPress={handleChooseServiceBundle}
                          Icon={TIER_ICONS[serviceBundle.tier]}
                          customClassName={isLastItem && 'mr-4'}
                        />
                      )
                    })}
                  </>
                )}
              </ScrollView>
            </View>
          </View>
          <AddVehicleBottomSheet
            userId={currentUser.id}
            addVehicle={handleAddVehicle}
            isOpen={openAddVehicleBottomSheet}
            close={handleCloseAddVehicleBottomSheet}
          />
          <AddServicesBottomSheet
            selectedServiceBundle={selectedServiceBundle}
            isOpen={selectedServiceBundle !== null}
            close={handleCloseAddServicesBottomSheet}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </KeyboardAvoidingView>
  )
}
